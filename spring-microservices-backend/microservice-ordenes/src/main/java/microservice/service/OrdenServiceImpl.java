package microservice.service;

import microservice.entities.Orden;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import microservice.persistence.ordenRepository;

import java.util.List;

@Service
public class OrdenServiceImpl implements OrdenService {

    @Autowired
    private ordenRepository ordenRepository;

    @Override
    public List<Orden> findAll() {
        return List.of();
    }

    @Override
    public Orden findById(Long id) {
        return null;
    }

    @Override
    public void save(Orden orden) {
        ordenRepository.save(orden);
    }

    @Override
    public List<Orden> findByIdOrden(Long idOrden) {
        return ordenRepository.findAllOrdenes(idOrden);
    }
}
