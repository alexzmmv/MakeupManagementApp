package com.example.makeupms.repos;

import com.example.makeupms.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // Custom queries to filter products
    List<Product> findByCategory(String category);
    List<Product> findByType(String type);
    List<Product> findByBrand(String brand);
    List<Product> findByCategoryAndType(String category, String type);
    List<Product> findByCategoryAndTypeAndBrand(String category, String type, String brand);

    List<Product> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String name, String description);
}
