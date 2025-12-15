import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

/**
 * Professional ItemCard component
 * Features: Soft UI buttons, visual hierarchy, and stock status indicators.
 */
const ItemCard = ({ item, onEdit, onDelete }) => {
    // Destructure item properties
    const { id, name, quantity, category } = item;

    // Logic: Determine stock status color
    const isLowStock = quantity < 10;
    const stockColor = isLowStock ? '#D97706' : '#059669'; // Dark Orange vs Dark Green
    const stockBg = isLowStock ? '#FFFBEB' : '#ECFDF5';   // Light Orange vs Light Green

    return (
        <View style={styles.card}>
            
            {/* --- Top Row: Name and Quantity --- */}
            <View style={styles.headerRow}>
                <View style={styles.titleContainer}>
                    <Text style={styles.itemName} numberOfLines={1}>{name}</Text>
                    
                    {/* Category Pill */}
                    <View style={styles.categoryPill}>
                        <Text style={styles.categoryIcon}>🏷️</Text> 
                        <Text style={styles.categoryText}>{category}</Text>
                    </View>
                </View>

                {/* Quantity Badge */}
                <View style={[styles.quantityBadge, { backgroundColor: stockBg }]}>
                    <Text style={[styles.quantityValue, { color: stockColor }]}>
                        {quantity}
                    </Text>
                    <Text style={[styles.quantityLabel, { color: stockColor }]}>
                        in stock
                    </Text>
                </View>
            </View>

            {/* --- Divider Line --- */}
            <View style={styles.divider} />

            {/* --- Bottom Row: Action Buttons --- */}
            <View style={styles.buttonRow}>
                
                {/* Edit Button (Soft Blue) */}
                <TouchableOpacity 
                    style={[styles.actionButton, styles.editButton]} 
                    onPress={() => onEdit(item)}
                    activeOpacity={0.7}
                >
                    <Text style={styles.editButtonText}>✏️ Edit</Text>
                </TouchableOpacity>

                {/* Delete Button (Soft Red) */}
                <TouchableOpacity 
                    style={[styles.actionButton, styles.deleteButton]} 
                    onPress={() => onDelete(id)}
                    activeOpacity={0.7}
                >
                    <Text style={styles.deleteButtonText}>🗑️ Delete</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginHorizontal: 16,
        marginVertical: 10,
        // Modern, diffuse shadow
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    titleContainer: {
        flex: 1,
        marginRight: 12,
    },
    itemName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1E293B', // Slate-800
        marginBottom: 8,
        letterSpacing: 0.3,
    },
    categoryPill: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: '#F8FAFC',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    categoryIcon: {
        fontSize: 10,
        marginRight: 4,
    },
    categoryText: {
        fontSize: 12,
        color: '#64748B', // Slate-500
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    // Stock Badge Styles
    quantityBadge: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 12,
        minWidth: 70,
    },
    quantityValue: {
        fontSize: 18,
        fontWeight: '800',
    },
    quantityLabel: {
        fontSize: 10,
        fontWeight: '600',
        marginTop: -2,
    },
    // Divider
    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginVertical: 16,
    },
    // Buttons
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12, // React Native 0.71+ supports gap. If older, use marginLeft on the second button.
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
        minWidth: 90,
        justifyContent: 'center',
    },
    // Edit Styles
    editButton: {
        backgroundColor: '#EFF6FF', // Blue-50
    },
    editButtonText: {
        color: '#3B82F6', // Blue-500
        fontWeight: '600',
        fontSize: 14,
    },
    // Delete Styles
    deleteButton: {
        backgroundColor: '#FEF2F2', // Red-50
    },
    deleteButtonText: {
        color: '#EF4444', // Red-500
        fontWeight: '600',
        fontSize: 14,
    },
});

export default ItemCard;