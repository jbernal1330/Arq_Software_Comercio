package com.Ordenes.Ordenes.service;

import com.Ordenes.Ordenes.entities.Orden;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.Ordenes.Ordenes.persistence.ordenRepository;

import java.util.List;

@Service
public class OrdenServiceImpl implements OrdenService {

    @Autowired
    private ordenRepository ordenRepository;

    @Override
    public List<Orden> findAll() {
        return (List<Orden>) ordenRepository.findAll();
    }

    @Override
    public Orden findById(Long id) {
        return ordenRepository.findById(id).orElse(null);
    }

    @Override
    public void save(Orden orden) {
        ordenRepository.save(orden);
    }

    @Override
    public List<Orden> findByClientId(Long idClient) {
        return ordenRepository.findAllOrdenes(idClient);
    }
}
