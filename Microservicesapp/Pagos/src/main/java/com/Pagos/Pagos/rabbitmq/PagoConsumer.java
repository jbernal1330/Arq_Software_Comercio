package com.Pagos.Pagos.rabbitmq;

import com.Pagos.Pagos.entities.Pago;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class PagoConsumer {

    @RabbitListener(queues = "pago.queue")
    public void recibirPago(Pago pago) {
        System.out.println("Mensaje recibido: " + pago);
        // Procesar lógica del pago
    }
}
