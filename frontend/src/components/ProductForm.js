import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText
} from '@mui/material';

const ProductForm = ({ onProductAdded }) => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        stockQuantity: '',
        categoryId: '',
    });
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({
        name: '',
        price: '',
        stockQuantity: '',
        categoryId: '',
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
        validateField(name, value);
    };

    const validateField = (fieldName, value) => {
        let errorMessage = '';

        switch (fieldName) {
            case 'name':
                errorMessage = value.trim() ? '' : 'Product name is required';
                break;
            case 'price':
                errorMessage = value > 0 ? '' : 'Price must be greater than 0';
                break;
            case 'stockQuantity':
                errorMessage = value >= 0 ? '' : 'Stock quantity must be 0 or greater';
                break;
            case 'categoryId':
                errorMessage = value ? '' : 'Category is required';
                break;
            default:
                break;
        }

        setErrors({ ...errors, [fieldName]: errorMessage });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields before submitting
        const { name, price, stockQuantity, categoryId } = product;
        validateField('name', name);
        validateField('price', price);
        validateField('stockQuantity', stockQuantity);
        validateField('categoryId', categoryId);

        // If any errors exist, prevent form submission
        if (Object.values(errors).some((error) => error)) {
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/products', product);
            onProductAdded(response.data);
            setProduct({
                name: '',
                description: '',
                price: '',
                stockQuantity: '',
                categoryId: '',
            });
            setErrors({
                name: '',
                price: '',
                stockQuantity: '',
                categoryId: '',
            });
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <div>
            <h2>Add Product</h2>
    <form onSubmit={handleSubmit}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Product Name"
                name="name"
                value={product.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
            />
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="description"
                label="Description"
                name="description"
                value={product.description}
                onChange={handleChange}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="price"
                label="Price"
                name="price"
                type="number"
                value={product.price}
                onChange={handleChange}
                error={!!errors.price}
                helperText={errors.price}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="stockQuantity"
                label="Stock Quantity"
                name="stockQuantity"
                type="number"
                value={product.stockQuantity}
                onChange={handleChange}
                error={!!errors.stockQuantity}
                helperText={errors.stockQuantity}
            />
            <FormControl variant="outlined" fullWidth margin="normal" required error={!!errors.categoryId}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                    labelId="category-label"
                    id="category"
                    name="categoryId"
                    value={product.categoryId}
                    onChange={handleChange}
                    label="Category"
                >
                    <MenuItem value="">
                        <em>Select Category</em>
                    </MenuItem>
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
                {errors.categoryId && <FormHelperText>{errors.categoryId}</FormHelperText>}
            </FormControl>
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
                Add Product
            </Button>
        </form>
        </div>
    );
};

export default ProductForm;
