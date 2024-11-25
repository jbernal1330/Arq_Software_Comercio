package com.Ordenes.Ordenes.controller;


import com.Ordenes.Ordenes.dto.ordenDTO;
import com.Ordenes.Ordenes.publisher.RabbitMQJsonProducer;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v2")
public class MessageJsonController {

    private final RabbitMQJsonProducer jsonProducer;

    public MessageJsonController(RabbitMQJsonProducer jsonProducer) {
        this.jsonProducer = jsonProducer;
    }

    // Endpoint ajustado para evitar conflicto con el otro controlador
    @PostMapping("/publish/json")
    public ResponseEntity<String> sendJsonMessage(@RequestBody ordenDTO orden) {
        if (orden == null) {
            return ResponseEntity.badRequest().body("Message cannot be empty");
        }
        jsonProducer.sendJsonMessage(orden);
        return ResponseEntity.ok("Message sent to RabbitMQ as JSON ... ");
    }
}
