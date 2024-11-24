
package com.microservice.inventario.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import com.microservice.inventario.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
