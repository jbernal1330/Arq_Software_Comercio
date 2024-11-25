package loginRabbitMQ.Publisher;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RabbitMQProducer {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    private static final String EXCHANGE = "login.exchange";
    private static final String ROUTING_KEY = "login.key";

    public void enviarMensaje(String mensaje) {
        rabbitTemplate.convertAndSend(EXCHANGE, ROUTING_KEY, mensaje);
        System.out.println("Mensaje enviado: " + mensaje);
    }
}

