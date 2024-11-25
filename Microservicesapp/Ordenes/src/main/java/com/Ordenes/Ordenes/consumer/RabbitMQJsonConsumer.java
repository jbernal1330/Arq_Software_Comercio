package com.Ordenes.Ordenes.consumer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.Ordenes.Ordenes.dto.ordenDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class RabbitMQJsonConsumer {

    private static final Logger LOGGER = LoggerFactory.getLogger(RabbitMQJsonConsumer.class);
    private final ObjectMapper objectMapper = new ObjectMapper(); // Crear un serializador local

    @RabbitListener(queues = "${rabbitmq.exchange.name}")
    public void Jsonconsumer(String jsonMessage) {
        try {
            // Deserializar el JSON manualmente a LoginDTO
            ordenDTO ordenDTO = objectMapper.readValue(jsonMessage, ordenDTO.class);
            LOGGER.info("Received LoginDTO -> {}", ordenDTO);
            // Procesar el LoginDTO aquí
        } catch (Exception e) {
            LOGGER.error("Error deserializing JSON message -> {}", e.getMessage());
        }
    }
}