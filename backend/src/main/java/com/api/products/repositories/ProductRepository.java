package com.api.products.repositories;

import com.api.products.entities.Category;
import com.api.products.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
