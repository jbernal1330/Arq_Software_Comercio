package net.javaguides.springboot.publisher;

import net.javaguides.springboot.consumer.RabbitMQConsumer;
import net.javaguides.springboot.dto.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class RabbitMQJsonProducer {
    @Value("${rabbitmq.exchange.name}")
    private String exchange;

    @Value("${rabbitmq.routing.json.key}")
    private String routingKey;
    private static final Logger LOGGER= LoggerFactory.getLogger(RabbitMQJsonProducer.class);
    RabbitTemplate rabbitTemplate;

    public RabbitMQJsonProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void sendJsonMessage(User user) {
        LOGGER.info(String.format("Recibido mensaje -> %s", user.toString()));
        rabbitTemplate.convertAndSend(exchange, routingKey, user);
    }
}
