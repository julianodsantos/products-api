import React, { useState } from 'react';
import axios from 'axios';
import {
    TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';

const ProductList = ({ products, onDeleteProduct, onUpdateProduct }) => {
    const [editMode, setEditMode] = useState(null);
    const [editedProduct, setEditedProduct] = useState({
        id: null, name: '', description: '', price: '', quantity: '', categoryId: ''
    });

    const handleEdit = (product) => {
        setEditMode(product.id);
        setEditedProduct({ ...product, categoryId: product.category.id });
    };

    const cancelEdit = () => {
        setEditMode(null);
        setEditedProduct({ id: null, name: '', description: '', price: '', quantity: '', categoryId: '' });
    };

    const saveEdit = async () => {
        try {
            const { id, name, description, price, quantity, categoryId } = editedProduct;
            await axios.put(`http://localhost:8080/products/${id}`, {
                id, name, description, price, quantity, category: { id: categoryId }
            });
            setEditMode(null);
            setEditedProduct({ id: null, name: '', description: '', price: '', quantity: '', categoryId: '' });
            onUpdateProduct(); // Atualiza a lista após a edição
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({ ...editedProduct, [name]: value });
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
                                            name="quantity"
                                            value={editedProduct.quantity}
                                            onChange={handleChange}
                                            type="number"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            name="categoryId"
                                            value={editedProduct.categoryId}
                                            onChange={handleChange}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={saveEdit} variant="contained" color="primary" style={{ marginRight: '10px' }}>
                                            Save
                                        </Button>
                                        <Button onClick={cancelEdit} variant="contained" color="secondary">
                                            Cancel
                                        </Button>
                                    </TableCell>
                                </>
                            ) : (
                                <>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.quantity}</TableCell>
                                    <TableCell>{`${product.category.id} - ${product.category.name}`}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleEdit(product)} style={{ marginRight: '10px' }}>
                                            Edit
                                        </Button>
                                        <Button onClick={() => onDeleteProduct(product.id)} color="secondary">
                                            Delete
                                        </Button>
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
