
package microservice.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import microservice.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
