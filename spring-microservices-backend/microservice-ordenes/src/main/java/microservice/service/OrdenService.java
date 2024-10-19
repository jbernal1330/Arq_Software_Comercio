package microservice.service;

import microservice.entities.Orden;

import java.util.List;

public interface OrdenService {

    List<Orden> findAll();

    Orden findById(Long id);

    void save(Orden orden);

    List<Orden> findByIdOrden(Long idOrden);
}
