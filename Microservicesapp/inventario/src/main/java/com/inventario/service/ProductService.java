
package com.inventario.service;

import com.inventario.dto.ProductDTO;

import java.util.List;

public interface ProductService {
    List<ProductDTO> getAllProducts();
    ProductDTO createProduct(ProductDTO productDTO);

    ProductDTO getProductById(Long id);
}
