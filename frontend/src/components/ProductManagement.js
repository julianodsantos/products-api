import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import { TextField, Button } from '@mui/material';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categorySearchTerm, setCategorySearchTerm] = useState('');

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/products');
            setProducts(response.data);
            setFilteredProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleProductAdded = (newProduct) => {
        const updatedProducts = [...products, newProduct];
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);
    };

    const handleDeleteProduct = async (deletedProductId) => {
        try {
            await axios.delete(`http://localhost:8080/products/${deletedProductId}`);
            const updatedProducts = products.filter((product) => product.id !== deletedProductId);
            setProducts(updatedProducts);
            setFilteredProducts(updatedProducts);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleUpdateProduct = () => {
        fetchProducts();
    };

    const handleSearch = () => {
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (!categorySearchTerm || product.categoryId === parseInt(categorySearchTerm))
        );
        setFilteredProducts(filtered);
    };

    return (
        <div>
            <br />
            <h2>Product Management</h2>
            <TextField
                label="Search Products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '10px', marginRight: '10px' }}
            />
            <TextField
                label="Category ID"
                value={categorySearchTerm}
                onChange={(e) => setCategorySearchTerm(e.target.value)}
                style={{ marginBottom: '10px', marginRight: '10px' }}
            />
            <Button variant="contained" color="primary" onClick={handleSearch}>
                Search
            </Button>
            <ProductForm categories={categories} onProductAdded={handleProductAdded} />
            <ProductList
                products={filteredProducts}
                onDeleteProduct={handleDeleteProduct}
                onUpdateProduct={handleUpdateProduct}
            />
        </div>
    );
};

export default ProductManagement;
