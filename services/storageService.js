import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@inventory_items';

/**
 * Get all items from AsyncStorage
 * @returns {Promise<Array>} Array of inventory items
 */
export const getItems = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
        console.error('Error reading items:', error);
        return [];
    }
};

/**
 * Save items array to AsyncStorage
 * @param {Array} items - Array of inventory items
 * @returns {Promise<boolean>} Success status
 */
export const saveItems = async (items) => {
    try {
        const jsonValue = JSON.stringify(items);
        await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
        return true;
    } catch (error) {
        console.error('Error saving items:', error);
        return false;
    }
};

/**
 * Add a new item to inventory
 * @param {Object} item - Item object with name, quantity, category
 * @returns {Promise<Object>} The added item with ID
 */
export const addItem = async (item) => {
    try {
        const items = await getItems();
        const newItem = {
            id: Date.now().toString(), // Simple unique ID based on timestamp
            ...item,
            createdAt: new Date().toISOString(),
        };
        items.push(newItem);
        await saveItems(items);
        return newItem;
    } catch (error) {
        console.error('Error adding item:', error);
        throw error;
    }
};

/**
 * Update an existing item
 * @param {string} id - Item ID
 * @param {Object} updatedItem - Updated item data
 * @returns {Promise<boolean>} Success status
 */
export const updateItem = async (id, updatedItem) => {
    try {
        const items = await getItems();
        const index = items.findIndex(item => item.id === id);
        if (index !== -1) {
            items[index] = { ...items[index], ...updatedItem, updatedAt: new Date().toISOString() };
            await saveItems(items);
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error updating item:', error);
        return false;
    }
};

/**
 * Delete an item from inventory
 * @param {string} id - Item ID to delete
 * @returns {Promise<boolean>} Success status
 */
export const deleteItem = async (id) => {
    try {
        const items = await getItems();
        const filteredItems = items.filter(item => item.id !== id);
        await saveItems(filteredItems);
        return true;
    } catch (error) {
        console.error('Error deleting item:', error);
        return false;
    }
};
