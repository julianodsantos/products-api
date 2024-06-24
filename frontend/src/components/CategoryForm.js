import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, FormControl, InputLabel } from '@mui/material';

const CategoryForm = ({ onCategoryAdded }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [nameError, setNameError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            setNameError(true);
            return;
        }
        if (!description.trim()) {
            setDescriptionError(true);
            return;
        }

        try {
            const newCategory = { name, description };
            const response = await axios.post('http://localhost:8080/categories', newCategory);
            onCategoryAdded(response.data);
            setName('');
            setDescription('');
            setNameError(false);
            setDescriptionError(false);
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    return (
        <div>
            <h2>Add Category</h2>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="category-name">Name</InputLabel>
                    <TextField
                        id="category-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={nameError}
                        helperText={nameError && "Name is required"}
                        style={{ marginBottom: '10px' }}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel htmlFor="category-description">Description</InputLabel>
                    <TextField
                        id="category-description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        error={descriptionError}
                        helperText={descriptionError && "Description is required"}
                        style={{ marginBottom: '10px' }}
                    />
                </FormControl>
                <Button type="submit" variant="contained" color="primary" style={{ marginBottom: '10px' }}>
                    Add Category
                </Button>
            </form>
        </div>
    );
};

export default CategoryForm;
