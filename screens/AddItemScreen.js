import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import CustomDropdown from '../components/CustomDropdown';
import { addItem } from '../services/storageService';

const AddItemScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Form validation
    const validateForm = () => {
        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = 'Item name is required';
        }

        if (!quantity.trim()) {
            newErrors.quantity = 'Quantity is required';
        } else if (isNaN(quantity) || parseInt(quantity) <= 0) {
            newErrors.quantity = 'Quantity must be a positive number';
        }

        if (!category.trim()) {
            newErrors.category = 'Category is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle save
    const handleSave = async () => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const newItem = {
                name: name.trim(),
                quantity: parseInt(quantity),
                category: category.trim(),
            };

            await addItem(newItem);
            Alert.alert('Success', 'Item added successfully!', [
                { text: 'OK', onPress: () => navigation.goBack() },
            ]);
        } catch (error) {
            Alert.alert('Error', 'Failed to add item. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
                <Text style={styles.title}>Add New Item</Text>
                <Text style={styles.subtitle}>Fill in the details below</Text>

                <CustomInput
                    label="Item Name *"
                    value={name}
                    onChangeText={(text) => {
                        setName(text);
                        if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    placeholder="e.g., Laptop, Chair, Notebook"
                    error={errors.name}
                />

                <CustomInput
                    label="Quantity *"
                    value={quantity}
                    onChangeText={(text) => {
                        setQuantity(text);
                        if (errors.quantity) setErrors({ ...errors, quantity: '' });
                    }}
                    placeholder="e.g., 10"
                    keyboardType="numeric"
                    error={errors.quantity}
                />

                <CustomDropdown
                    label="Category *"
                    value={category}
                    onValueChange={(value) => {
                        setCategory(value);
                        if (errors.category) setErrors({ ...errors, category: '' });
                    }}
                    error={errors.category}
                />

                <View style={styles.buttonContainer}>
                    <CustomButton
                        title="Save Item"
                        onPress={handleSave}
                        variant="primary"
                        loading={loading}
                    />
                    <View style={styles.buttonSpacer} />
                    <CustomButton
                        title="Cancel"
                        onPress={() => navigation.goBack()}
                        variant="secondary"
                        disabled={loading}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
    },
    scrollView: {
        flex: 1,
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 24,
    },
    buttonContainer: {
        marginTop: 20,
    },
    buttonSpacer: {
        height: 12,
    },
});

export default AddItemScreen;
