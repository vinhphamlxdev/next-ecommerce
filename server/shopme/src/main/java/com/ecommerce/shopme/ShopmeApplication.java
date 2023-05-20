package com.ecommerce.shopme;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class ShopmeApplication {
	public static void main(String[] args) {
		SpringApplication.run(ShopmeApplication.class, args);
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		String rawPassword = "vinh12323";
		String encodePassword = encoder.encode(rawPassword);
		System.out.println(encodePassword);
	}

   

}
