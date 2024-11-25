
package microservice.service;
import microservice.dto.ProductDTO;
import microservice.entities.Product;
import microservice.persistence.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream().map(product -> {
            ProductDTO dto = new ProductDTO();
            dto.setId(product.getId());
            dto.setName(product.getName());
            dto.setDescription(product.getDescription());
            dto.setStock(product.getStock());
            dto.setPrice(product.getPrice());
            dto.setCategory(product.getCategory());
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setStock(productDTO.getStock());
        product.setPrice(productDTO.getPrice());
        product.setCategory(productDTO.getCategory());
        Product savedProduct = productRepository.save(product);

        productDTO.setId(savedProduct.getId());
        return productDTO;
    }
}
