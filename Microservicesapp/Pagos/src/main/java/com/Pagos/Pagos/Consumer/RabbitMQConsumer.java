package com.Pagos.Pagos.Consumer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;

public class RabbitMQConsumer {
    private static final Logger LOGGER = LoggerFactory.getLogger(RabbitMQConsumer.class);

    @RabbitListener(queues = "${rabbitmq.queue.name}")
    public void receiveOrder(String orderMessage) {
        LOGGER.info("Orden recibida en Pagos -> {}", orderMessage);
        // Procesar el mensaje de la orden
    }
}
