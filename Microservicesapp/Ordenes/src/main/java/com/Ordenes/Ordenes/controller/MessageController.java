package com.Ordenes.Ordenes.controller;


import com.Ordenes.Ordenes.publisher.RabbitMQProducerPagos;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class MessageController {
    private static final Logger LOGGER = LoggerFactory.getLogger(MessageController.class);

    private final RabbitMQProducerPagos rabbitMQProducer;
    private final List<String> mensajesRecibidos = new ArrayList<>();


    public MessageController(RabbitMQProducerPagos rabbitMQProducer) {
        this.rabbitMQProducer = rabbitMQProducer;
    }

    // Endpoint para manejar las órdenes y enviar un mensaje a Pagos
    @PostMapping
    public ResponseEntity<String> crearOrden(@RequestBody String ordenDetalle) {
        LOGGER.info("Nueva orden creada: {}", ordenDetalle);

        // Enviar mensaje al microservicio de Pagos
        rabbitMQProducer.enviarMensajePagos("Nueva orden procesada: " + ordenDetalle);

        return ResponseEntity.ok("Orden creada y notificación enviada a Pagos: " + ordenDetalle);
    }

    // Método que será llamado por RabbitMQConsumer cuando llegue un mensaje
    public void agregarMensaje(String mensaje) {
        LOGGER.info("Agregando mensaje recibido al historial: {}", mensaje);
        mensajesRecibidos.add(mensaje);
    }

    // Endpoint para verificar los mensajes recibidos de Inventario
    @GetMapping("/mensajes")
    public ResponseEntity<List<String>> obtenerMensajes() {
        LOGGER.info("Producto recibido");
        return ResponseEntity.ok(mensajesRecibidos);
    }
}

