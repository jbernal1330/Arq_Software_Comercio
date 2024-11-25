package com.Pagos.Pagos.service;

import com.Pagos.Pagos.entities.Pago;
import java.util.List;

public interface IPagoService {
    List<Pago> findAll();
    Pago findById(Long id);
    Pago save(Pago pago);
    void deleteById(Long id);
}
