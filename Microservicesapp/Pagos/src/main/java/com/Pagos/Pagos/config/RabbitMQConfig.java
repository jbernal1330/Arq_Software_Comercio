package com.microserver.pago.config;

import com.rabbitmq.client.ConnectionFactory;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    @Bean
    public DirectExchange pagoExchange() {
        return new DirectExchange("pago.exchange");
    }

    @Bean
    public Queue pagoQueue() {
        return new Queue("pago.queue", true); // true: persistente
    }

    @Bean
    public Binding binding(Queue pagoQueue, DirectExchange pagoExchange) {
        return BindingBuilder.bind(pagoQueue).to(pagoExchange).with("pago.key");
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        return new RabbitTemplate(connectionFactory);
    }
}
