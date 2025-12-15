import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

/**
 * CustomButton component
 * @param {string} title - Button text
 * @param {Function} onPress - Callback when button is pressed
 * @param {string} variant - Button style variant: 'primary', 'secondary', 'danger'
 * @param {boolean} disabled - Whether button is disabled
 * @param {boolean} loading - Whether to show loading indicator
 */
const CustomButton = ({
    title,
    onPress,
    variant = 'primary',
    disabled = false,
    loading = false
}) => {
    const buttonStyle = [
        styles.button,
        styles[variant],
        disabled && styles.disabled,
    ];

    return (
        <TouchableOpacity
            style={buttonStyle}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <Text style={styles.buttonText}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
    },
    primary: {
        backgroundColor: '#007AFF',
    },
    secondary: {
        backgroundColor: '#8E8E93',
    },
    danger: {
        backgroundColor: '#FF3B30',
    },
    disabled: {
        backgroundColor: '#C7C7CC',
        opacity: 0.6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default CustomButton;
