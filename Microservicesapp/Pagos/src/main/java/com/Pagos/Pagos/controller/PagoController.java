package com.Pagos.Pagos.controller;

import com.Pagos.Pagos.entities.Pago;
import com.Pagos.Pagos.rabbitmq.PagoProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pagos")
public class PagoController {

    @Autowired
    private PagoProducer pagoProducer;

    @PostMapping("/crear")
    public ResponseEntity<String> crearPago(@RequestBody Pago pago) {
        // Lógica para guardar el pago en la base de datos
        pagoProducer.enviarPago(pago);
        return ResponseEntity.ok("Pago creado y mensaje enviado");
    }
}
