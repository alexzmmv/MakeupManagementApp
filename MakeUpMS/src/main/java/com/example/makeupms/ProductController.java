package com.example.makeupms;

import com.example.makeupms.model.Product;
import com.example.makeupms.repos.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    // Create new product
    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        System.out.println("Received product: " + product);
        return productRepository.save(product);
    }

    // Get all products
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Get product by ID
    @GetMapping("/{id}")
    public Optional<Product> getProductById(@PathVariable Long id) {
        return productRepository.findById(id);
    }

    // Update product by ID
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
        return productRepository.findById(id)
                .map(product -> {
                    product.setName(updatedProduct.getName());
                    product.setCategory(updatedProduct.getCategory());
                    product.setType(updatedProduct.getType());
                    product.setBrand(updatedProduct.getBrand());
                    product.setDescription(updatedProduct.getDescription());
                    product.setQuantity(updatedProduct.getQuantity());
                    product.setIsOpened(updatedProduct.getIsOpened());
                    product.setPrice(updatedProduct.getPrice());
                    product.setExpirationDate(updatedProduct.getExpirationDate());
                    product.setPurchaseDate(updatedProduct.getPurchaseDate());
                    product.setOpenDate(updatedProduct.getOpenDate());
                    product.setOpenDuration(updatedProduct.getOpenDuration());
                    product.setNotes(updatedProduct.getNotes());
                    return productRepository.save(product);
                })
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    // Delete product by ID
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
    }

    // Filter products by category, type, and brand
    @GetMapping("/filter")
    public List<Product> filterProducts(@RequestParam(required = false) String category,
                                        @RequestParam(required = false) String type,
                                        @RequestParam(required = false) String brand) {
        if (category != null && type != null && brand != null) {
            return productRepository.findByCategoryAndTypeAndBrand(category, type, brand);
        } else if (category != null && type != null) {
            return productRepository.findByCategoryAndType(category, type);
        } else if (category != null) {
            return productRepository.findByCategory(category);
        } else if (type != null) {
            return productRepository.findByType(type);
        } else if (brand != null) {
            return productRepository.findByBrand(brand);
        } else {
            return productRepository.findAll(); // No filter applied
        }
    }

    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam(required = false) String keyword) {
        if (keyword != null) {
            return productRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(keyword, keyword);
        } else {
            return productRepository.findAll(); // No search applied
        }
    }
}
