package microservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class OrdenesApplication {

	public static void main(String[] args) {
		SpringApplication.run(OrdenesApplication.class, args);
	}

}
