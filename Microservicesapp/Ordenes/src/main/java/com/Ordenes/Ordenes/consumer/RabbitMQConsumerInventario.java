package com.Ordenes.Ordenes.consumer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class RabbitMQConsumerInventario {

    private static final Logger LOGGER = LoggerFactory.getLogger(RabbitMQConsumer.class);

    @RabbitListener(queues = "${rabbitmq.queue.inventario}")
    public void receiveMessage(String message) {
        LOGGER.info("Mensaje recibido: {}", message);
        // Procesar el mensaje recibido
        System.out.println("Se notifico productor pedido: " + message);
    }
}
