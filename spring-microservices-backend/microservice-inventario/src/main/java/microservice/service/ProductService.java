
package com.microservice.inventario.service;

import com.microservice.inventario.dto.ProductDTO;
import java.util.List;

public interface ProductService {
    List<ProductDTO> getAllProducts();
    ProductDTO createProduct(ProductDTO productDTO);
}
