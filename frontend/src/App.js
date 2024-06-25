import React from 'react';
import './App.css';
import CategoryManagement from './components/CategoryManagement';
import ProductManagement from './components/ProductManagement';

const App = () => {
    return (
        <div className="App">
            <CategoryManagement />
            <ProductManagement />
        </div>
    );
};

export default App;
