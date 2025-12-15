import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert,
    RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ItemCard from '../components/ItemCard';
import { getItems, deleteItem } from '../services/storageService';

const HomeScreen = ({ navigation }) => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortType, setSortType] = useState('none'); // 'none', 'name', 'quantity'
    const [refreshing, setRefreshing] = useState(false);

    // Load items when screen comes into focus
    useFocusEffect(
        useCallback(() => {
            loadItems();
        }, [])
    );

    const loadItems = async () => {
        const loadedItems = await getItems();
        setItems(loadedItems);
        applyFiltersAndSort(loadedItems, searchQuery, sortType);
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadItems();
        setRefreshing(false);
    };

    // Apply search and sort
    const applyFiltersAndSort = (itemList, query, sort) => {
        let result = [...itemList];

        // Apply search filter
        if (query.trim()) {
            result = result.filter(item =>
                item.name.toLowerCase().includes(query.toLowerCase())
            );
        }

        // Apply sorting
        if (sort === 'name') {
            result.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sort === 'quantity') {
            result.sort((a, b) => b.quantity - a.quantity);
        }

        setFilteredItems(result);
    };

    // Handle search
    const handleSearch = (query) => {
        setSearchQuery(query);
        applyFiltersAndSort(items, query, sortType);
    };

    // Handle sort
    const handleSort = (type) => {
        const newSortType = sortType === type ? 'none' : type;
        setSortType(newSortType);
        applyFiltersAndSort(items, searchQuery, newSortType);
    };

    // Handle edit
    const handleEdit = (item) => {
        navigation.navigate('EditItem', { item });
    };

    // Handle delete with confirmation
    const handleDelete = (id) => {
        Alert.alert(
            'Delete Item',
            'Are you sure you want to delete this item?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        await deleteItem(id);
                        await loadItems();
                    },
                },
            ]
        );
    };

    const renderItem = ({ item }) => (
        <ItemCard item={item} onEdit={handleEdit} onDelete={handleDelete} />
    );

    const renderEmpty = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No items in inventory</Text>
            <Text style={styles.emptySubtext}>Tap the + button to add your first item</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search items..."
                    value={searchQuery}
                    onChangeText={handleSearch}
                    placeholderTextColor="#999"
                />
            </View>

            {/* Sort Buttons */}
            <View style={styles.sortContainer}>
                <TouchableOpacity
                    style={[styles.sortButton, sortType === 'name' && styles.sortButtonActive]}
                    onPress={() => handleSort('name')}
                >
                    <Text style={[styles.sortText, sortType === 'name' && styles.sortTextActive]}>
                        A-Z
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.sortButton, sortType === 'quantity' && styles.sortButtonActive]}
                    onPress={() => handleSort('quantity')}
                >
                    <Text style={[styles.sortText, sortType === 'quantity' && styles.sortTextActive]}>
                        Quantity
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Items List */}
            <FlatList
                data={filteredItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={renderEmpty}
                contentContainerStyle={filteredItems.length === 0 && styles.emptyList}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />

            {/* Floating Add Button */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('AddItem')}
            >
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
    },
    searchContainer: {
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
    },
    searchInput: {
        backgroundColor: '#F2F2F7',
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        color: '#333',
    },
    sortContainer: {
        flexDirection: 'row',
        padding: 12,
        gap: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
    },
    sortButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#F2F2F7',
        borderWidth: 1,
        borderColor: '#E5E5EA',
    },
    sortButtonActive: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },
    sortText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    sortTextActive: {
        color: '#fff',
    },
    emptyList: {
        flexGrow: 1,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    emptyText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#666',
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
    fabText: {
        fontSize: 32,
        color: '#fff',
        fontWeight: '300',
    },
});

export default HomeScreen;
