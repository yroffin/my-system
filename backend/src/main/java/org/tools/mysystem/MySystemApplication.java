package org.tools.mysystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = { "org.tools.mysystem.service.rest", "org.tools.mysystem.service.app",
		"org.tools.mysystem.repository" })
public class MySystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(MySystemApplication.class, args);
	}

}
