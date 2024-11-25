package com.Ordenes.Ordenes.service;

import com.Ordenes.Ordenes.entities.Orden;

import java.util.List;

public interface OrdenService {

    List<Orden> findAll();

    Orden findById(Long id);

    void save(Orden orden);

    List<Orden> findByClientId(Long clientId);
}
