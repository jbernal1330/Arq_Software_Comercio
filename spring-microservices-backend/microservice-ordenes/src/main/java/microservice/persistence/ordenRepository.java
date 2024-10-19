package microservice.persistence;


import microservice.entities.Orden;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ordenRepository extends CrudRepository<Orden, Long> {

    @Query("SELECT s FROM Orden s WHERE s.id= :idOrden")
    List<Orden> findAllOrdenes(Long idOrden);
}