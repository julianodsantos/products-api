import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import { TextField, Button } from '@mui/material';

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/categories');
            setCategories(response.data);
            setFilteredCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleCategoryAdded = (newCategory) => {
        const updatedCategories = [...categories, newCategory];
        setCategories(updatedCategories);
        setFilteredCategories(updatedCategories);
    };

    const handleDeleteCategory = async (deletedCategoryId) => {
        try {
            await axios.delete(`http://localhost:8080/categories/${deletedCategoryId}`);
            const updatedCategories = categories.filter((category) => category.id !== deletedCategoryId);
            setCategories(updatedCategories);
            setFilteredCategories(updatedCategories);
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const handleUpdateCategory = () => {
        fetchCategories();
    };

    const handleSearch = () => {
        const filtered = categories.filter(category =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCategories(filtered);
    };

    return (
        <div>
            <h2>Category Management</h2>
            <TextField
                label="Search Categories"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '10px', marginRight: '10px' }}
            />
            <Button variant="contained" color="primary" onClick={handleSearch}>
                Search
            </Button>
            <CategoryForm onCategoryAdded={handleCategoryAdded} />
            <CategoryList
                categories={filteredCategories}
                onDeleteCategory={handleDeleteCategory}
                onUpdateCategory={handleUpdateCategory}
            />
        </div>
    );
};

export default CategoryManagement;
