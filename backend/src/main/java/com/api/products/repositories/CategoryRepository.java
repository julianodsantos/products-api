package com.api.products.repositories;

import com.api.products.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByDescriptionContainingIgnoreCase(String name);
}
