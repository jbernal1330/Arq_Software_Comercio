package com.Ordenes.Ordenes.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.amqp.rabbit.listener.adapter.MessageListenerAdapter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    @Value("${rabbitmq.queue.inventario}")
    private String inventarioQueue;
    @Value("${rabbitmq.queue.pagos}")
    private String pagosQueue;
    @Value("${rabbitmq.exchange.name}")
    private String exchangeName;
    @Value("${rabbitmq.routing.pagos.key}")
    private String pagosRoutingKey;
    @Value("${rabbitmq.routing.inventario.key}")
    private String inventarioRoutingKey;

    // Configuración de RabbitTemplate
    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        return new RabbitTemplate(connectionFactory);
    }

    // Configuración de la cola de Inventario
    @Bean
    public Queue inventarioQueue() {
        return new Queue(inventarioQueue, true);
    }

    // Configuración del binding para Inventario
    @Bean
    public Binding inventarioBinding(Queue inventarioQueue, DirectExchange exchange) {
        return BindingBuilder.bind(inventarioQueue).to(exchange).with(inventarioRoutingKey);
    }

    // Configuración de la cola de Pagos
    @Bean
    public Queue pagosQueue() {
        return new Queue(pagosQueue, true);
    }

    // Configuración del binding para Pagos
    @Bean
    public Binding pagosBinding(Queue pagosQueue, DirectExchange exchange) {
        return BindingBuilder.bind(pagosQueue).to(exchange).with(pagosRoutingKey);
    }

    // Configuración del Exchange
    @Bean
    public DirectExchange exchange() {
        return new DirectExchange(exchangeName);
    }

    // Listener para consumir los mensajes de la cola 'inventario_orden'
    @Bean
    public SimpleMessageListenerContainer messageListenerContainer(ConnectionFactory connectionFactory) {
        SimpleMessageListenerContainer container = new SimpleMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);
        container.setQueueNames("inventario_orden"); // Nombre de la cola exacta
        container.setMessageListener(new MessageListenerAdapter(new Object() {
            public void handleMessage(String message) {
                // Lógica para manejar el mensaje
                System.out.println("Porductor recibido: " + message);
            }
        }));
        container.setDefaultRequeueRejected(false); // Opcional: No reenviar mensajes rechazados
        return container;
    }

}
