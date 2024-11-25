package com.microservice.pago;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class MicroservicePagoApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroservicePagoApplication.class, args);
	}

}
