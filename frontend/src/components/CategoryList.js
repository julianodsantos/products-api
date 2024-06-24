import React, { useState } from 'react';
import axios from 'axios';
import {
    TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';

const CategoryList = ({ categories, onDeleteCategory, onUpdateCategory }) => {
    const [editMode, setEditMode] = useState(null);
    const [editedCategory, setEditedCategory] = useState({ id: null, name: '', description: '' });

    const handleEdit = (category) => {
        setEditMode(category.id);
        setEditedCategory({ ...category });
    };

    const cancelEdit = () => {
        setEditMode(null);
        setEditedCategory({ id: null, name: '', description: '' });
    };

    const saveEdit = async () => {
        try {
            const { id, name, description } = editedCategory;
            await axios.put(`http://localhost:8080/categories/${id}`, { id, name, description });
            setEditMode(null);
            setEditedCategory({ id: null, name: '', description: '' });
            onUpdateCategory(); // Atualiza a lista após a edição
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedCategory({ ...editedCategory, [name]: value });
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories.map((category) => (
                        <TableRow key={category.id}>
                            {editMode === category.id ? (
                                <>
                                    <TableCell>
                                        <TextField
                                            name="name"
                                            value={editedCategory.name}
                                            onChange={handleChange}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            name="description"
                                            value={editedCategory.description}
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
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>{category.description}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleEdit(category)} style={{ marginRight: '10px' }}>
                                            Edit
                                        </Button>
                                        <Button onClick={() => onDeleteCategory(category.id)} color="secondary">
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

export default CategoryList;
