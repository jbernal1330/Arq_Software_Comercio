package com.Ordenes.Ordenes.consumer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;

public class RabbitMQConsumer {

    private static final Logger LOGGER = LoggerFactory.getLogger(RabbitMQConsumer.class);

    @RabbitListener(queues = "${rabbitmq.queue.login-order}")
    public void recibirMensaje(String mensaje) {
        LOGGER.info("Se registro usuario -> {}", mensaje);
        // Procesar el mensaje aquí
    }
}