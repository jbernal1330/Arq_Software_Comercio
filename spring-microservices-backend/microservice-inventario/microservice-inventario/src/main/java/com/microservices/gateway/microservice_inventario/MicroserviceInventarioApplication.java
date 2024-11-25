package com.microservices.gateway.microservice_inventario;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@EnableDiscoveryClient
@SpringBootApplication
public class MicroserviceInventarioApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroserviceInventarioApplication.class, args);
	}

}
