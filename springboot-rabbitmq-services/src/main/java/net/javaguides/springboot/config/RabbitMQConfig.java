package net.javaguides.springboot.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConversionException;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    @Value("${rabbitmq.queue.name}")
    private String queue;

    @Value("${rabbitmq.queue.json.name}")
    public String jsonQueue;
    // spring bean for (queue message)
    @Bean
    public Queue jsonQueue(){
        return new Queue(jsonQueue);
    };

    @Value("${rabbitmq.exchange.name}")
    private String exchange;

    @Value("${rabbitmq.routing.key}")
    private String routingKey;

    @Value("${rabbitmq.queue.json.name}")
    private String JsonQueue;

    @Value("${rabbitmq.routing.json.key}")
    private String RoutingJsonKey;
    @Bean
    // Spring bean for rabbitmq queue
    public Queue queue() {
        return new Queue(queue);
    }

    // spring bean for rabbitmq exchange
    @Bean
    public TopicExchange exchange(){
        return new TopicExchange(exchange);
    }

    // binding between queue and exchange using routing key
    @Bean
    public Binding binding(){
        return BindingBuilder.bind(queue())
                .to(exchange())
                .with(routingKey);
    }
    // binding between json queue and exchange using routing key
   @Bean
    public Binding Jsonbinding(){
        return BindingBuilder
                .bind(jsonQueue())
                .to(exchange())
                .with(RoutingJsonKey);
    }
    @Bean
    public MessageConverter converter(){
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public AmqpTemplate amqpTemplate(ConnectionFactory connectionFactory){
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(converter());
        return rabbitTemplate;
    }
    // ConnectionFactory
    // RabbitTemplates
    // RabbitAdmin
}
