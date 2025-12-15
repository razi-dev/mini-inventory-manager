import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

/**
 * CustomDropdown component for category selection
 * @param {string} label - Label for the dropdown
 * @param {string} value - Selected value
 * @param {Function} onValueChange - Callback when value changes
 * @param {string} error - Error message to display
 */
const CustomDropdown = ({ label, value, onValueChange, error }) => {
    const categories = [
        { label: 'Select Category', value: '' },
        { label: 'Furniture', value: 'Furniture' },
        { label: 'Electronics', value: 'Electronics' },
        { label: 'Stationary', value: 'Stationary' },
        { label: 'Grocery', value: 'Grocery' },
        { label: 'Pharmacy', value: 'Pharmacy' },
        { label: 'Toys', value: 'Toys' },
        { label: 'Others', value: 'Others' },
    ];

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[styles.pickerContainer, error && styles.pickerError]}>
                <Picker
                    selectedValue={value}
                    onValueChange={onValueChange}
                    style={styles.picker}
                >
                    {categories.map((category) => (
                        <Picker.Item
                            key={category.value}
                            label={category.label}
                            value={category.value}
                        />
                    ))}
                </Picker>
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    pickerContainer: {
        backgroundColor: '#F2F2F7',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E5E5EA',
        overflow: 'hidden',
    },
    pickerError: {
        borderColor: '#FF3B30',
        borderWidth: 1.5,
    },
    picker: {
        height: 50,
        color: '#333',
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    },
});

export default CustomDropdown;
