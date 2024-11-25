package service;

import entities.Pago;
import java.util.List;

public interface IPagoService {
    List<Pago> findAll();
    Pago findById(Long id);
    Pago save(Pago pago);
    void deleteById(Long id);
}
