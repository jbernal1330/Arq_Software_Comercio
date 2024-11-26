package com.inventario.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
    @Value("${rabbitmq.exchange.name}")
    private String exchangeName;

    @Value("${rabbitmq.routing.inventario.key}")
    private String inventarioRoutingKey;

    @Value("${rabbitmq.queue.inventario}")
    private String inventarioQueue;

    @Bean
    public Queue inventarioQueue() {
        return new Queue(inventarioQueue, true);  // True para que la cola sobreviva a reinicios
    }

    @Bean
    public DirectExchange directExchange() {
        return new DirectExchange(exchangeName);  // Usando el nombre del exchange desde el .yml
    }

    @Bean
    public Binding inventarioBinding(Queue inventarioQueue, DirectExchange directExchange) {
        return BindingBuilder.bind(inventarioQueue).to(directExchange).with(inventarioRoutingKey);  // Enrutamiento
    }

    /*
    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        return new RabbitTemplate(connectionFactory);
    }*/
}
