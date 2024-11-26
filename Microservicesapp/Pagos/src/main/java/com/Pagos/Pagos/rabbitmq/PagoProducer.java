package com.Pagos.Pagos.rabbitmq;

import com.Pagos.Pagos.entities.Pago;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PagoProducer {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    private static final String EXCHANGE = "pago.exchange";
    private static final String ROUTING_KEY = "pago.key";

    public void enviarPago(Pago pago) {
        rabbitTemplate.convertAndSend(EXCHANGE, ROUTING_KEY, pago);
        System.out.println("Mensaje enviado: " + pago);
    }
}
