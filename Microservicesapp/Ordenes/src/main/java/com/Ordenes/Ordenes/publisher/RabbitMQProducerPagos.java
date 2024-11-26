package com.Ordenes.Ordenes.publisher;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class RabbitMQProducerPagos {
    private static final Logger LOGGER = LoggerFactory.getLogger(RabbitMQProducerPagos.class);

    @Value("${rabbitmq.exchange.name}")
    private String exchange;

    @Value("${rabbitmq.routing.pagos.key}")
    private String pagosRoutingKey;

    private final RabbitTemplate rabbitTemplate;

    public RabbitMQProducerPagos(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void enviarMensajePagos(String mensaje) {
        LOGGER.info("Enviando mensaje a Pagos: {}", mensaje);
        rabbitTemplate.convertAndSend(exchange, pagosRoutingKey, mensaje);
    }
}
