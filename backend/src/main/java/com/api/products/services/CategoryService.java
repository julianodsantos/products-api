package com.api.products.services;

import com.api.products.entities.Category;
import com.api.products.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository repository;

    public List<Category> findAll() {
        return repository.findAll();
    }

    public Category findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
    }

    public Category save(Category category) {
        return repository.save(category);
    }

    public void delete(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new RuntimeException("Category not found with id: " + id);
        }
    }

    public Category update(Long id, Category category) {
        Category currentCategory = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));

        currentCategory.setDescription(category.getDescription());
        currentCategory.setName(category.getName());

        return repository.save(currentCategory);
    }

    public List<Category> findByName(String name) {
        return repository.findByDescriptionContainingIgnoreCase(name);
    }
}

