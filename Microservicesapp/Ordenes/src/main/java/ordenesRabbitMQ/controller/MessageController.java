package ordenesRabbitMQ.controller;

import Ordenes.dto.ordenDTO;

import ordenesRabbitMQ.publisher.RabbitMQProducer;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class MessageController {

    private final RabbitMQProducer producer;

    public MessageController(RabbitMQProducer producer) {
        this.producer = producer;
    }

    @GetMapping("/publish")
    public ResponseEntity<String> sendMessage(@RequestParam("message") String message) {
        if (message == null || message.isBlank()) {
            return ResponseEntity.badRequest().body("Message cannot be empty");
        }
        producer.sendMessage(message);
        return ResponseEntity.ok("Message sent to RabbitMQ ... ");
    }

    @PostMapping("/publish/orden")
    public ResponseEntity<String> sendOrden(@RequestBody ordenDTO ordenDTO) {
        try {
            // Añade la fecha y hora actual al DTO
            producer.sendOrdenDTO(ordenDTO);

            return ResponseEntity.ok("Order data sent to RabbitMQ ... ");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error al procesar la orden");
        }
    }
}
