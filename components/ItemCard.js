import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

/**
 * ItemCard component to display individual inventory item
 * @param {Object} item - Item object with id, name, quantity, category
 * @param {Function} onEdit - Callback when edit button is pressed
 * @param {Function} onDelete - Callback when delete button is pressed
 */
const ItemCard = ({ item, onEdit, onDelete }) => {
    return (
        <View style={styles.card}>
            <View style={styles.infoContainer}>
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={styles.detailsRow}>
                    <Text style={styles.detailLabel}>Quantity: </Text>
                    <Text style={styles.detailValue}>{item.quantity}</Text>
                </View>
                <View style={styles.detailsRow}>
                    <Text style={styles.detailLabel}>Category: </Text>
                    <Text style={styles.detailValue}>{item.category}</Text>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.editButton]}
                    onPress={() => onEdit(item)}
                >
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}
                    onPress={() => onDelete(item.id)}
                >
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    infoContainer: {
        marginBottom: 12,
    },
    itemName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    detailsRow: {
        flexDirection: 'row',
        marginVertical: 2,
    },
    detailLabel: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    detailValue: {
        fontSize: 14,
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 8,
        minWidth: 80,
        alignItems: 'center',
    },
    editButton: {
        backgroundColor: '#007AFF',
    },
    deleteButton: {
        backgroundColor: '#FF3B30',
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
});

export default ItemCard;
