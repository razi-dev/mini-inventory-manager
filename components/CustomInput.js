import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

/**
 * CustomInput component
 * @param {string} label - Input label
 * @param {string} value - Input value
 * @param {Function} onChangeText - Callback when text changes
 * @param {string} placeholder - Placeholder text
 * @param {string} error - Error message to display
 * @param {string} keyboardType - Keyboard type (default, numeric, email-address, etc.)
 * @param {boolean} multiline - Whether input is multiline
 */
const CustomInput = ({
    label,
    value,
    onChangeText,
    placeholder,
    error,
    keyboardType = 'default',
    multiline = false,
}) => {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[
                    styles.input,
                    error && styles.inputError,
                    multiline && styles.multiline,
                ]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#999"
                keyboardType={keyboardType}
                multiline={multiline}
            />
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
    input: {
        backgroundColor: '#F2F2F7',
        borderRadius: 10,
        padding: 14,
        fontSize: 16,
        color: '#333',
        borderWidth: 1,
        borderColor: '#E5E5EA',
    },
    inputError: {
        borderColor: '#FF3B30',
        borderWidth: 1.5,
    },
    multiline: {
        minHeight: 80,
        textAlignVertical: 'top',
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    },
});

export default CustomInput;
