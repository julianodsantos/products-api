import React, { useState } from 'react';
import axios from 'axios';
import {
    TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';

const ProductList = ({ products, onDeleteProduct, onUpdateProduct }) => {
    const [editMode, setEditMode] = useState(null);
    const [editedProduct, setEditedProduct] = useState({
        id: null, name: '', description: '', price: '', stockQuantity: '', category: null
    });

    const handleEdit = (product) => {
        setEditMode(product.id);
        setEditedProduct({ ...product, category: product.category });
    };

    const cancelEdit = () => {
        setEditMode(null);
        setEditedProduct({ id: null, name: '', description: '', price: '', stockQuantity: '', category: null });
    };

    const saveEdit = async () => {
        try {
            const { id, name, description, price, stockQuantity, category } = editedProduct;
            await axios.put(`http://localhost:8080/products/${id}`, {
                id, name, description, price, stockQuantity, category
            });
            setEditMode(null);
            setEditedProduct({ id: null, name: '', description: '', price: '', stockQuantity: '', category: null });
            onUpdateProduct(); // Atualiza a lista após a edição
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'categoryId') {
            const selectedCategory = categories.find(category => category.id === parseInt(value));
            setEditedProduct({ ...editedProduct, category: selectedCategory });
        } else {
            setEditedProduct({ ...editedProduct, [name]: value });
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Stock Quantity</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            {editMode === product.id ? (
                                <>
                                    <TableCell>
                                        <TextField
                                            name="name"
                                            value={editedProduct.name}
                                            onChange={handleChange}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            name="description"
                                            value={editedProduct.description}
                                            onChange={handleChange}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            name="price"
                                            value={editedProduct.price}
                                            onChange={handleChange}
                                            type="number"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            name="stockQuantity"
                                            value={editedProduct.stockQuantity}
                                            onChange={handleChange}
                                            type="number"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            name="categoryId"
                                            value={editedProduct.category?.id || ''}
                                            onChange={handleChange}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={saveEdit}>Save</Button>
                                        <Button onClick={cancelEdit}>Cancel</Button>
                                    </TableCell>
                                </>
                            ) : (
                                <>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.stockQuantity}</TableCell>
                                    <TableCell>{product.category?.name}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleEdit(product)}>Edit</Button>
                                        <Button onClick={() => onDeleteProduct(product.id)}>Delete</Button>
                                    </TableCell>
                                </>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProductList;
