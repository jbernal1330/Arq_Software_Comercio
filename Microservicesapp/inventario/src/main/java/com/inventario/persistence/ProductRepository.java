package com.inventario.persistence;

import com.inventario.dto.ProductDTO;
import com.inventario.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    ProductDTO getProductById(Long Id);
}
