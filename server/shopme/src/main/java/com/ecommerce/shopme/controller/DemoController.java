package com.ecommerce.shopme.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {
    
    @GetMapping("/demo")
    public ResponseEntity<String> sayHello(){
        return ResponseEntity.ok("Helle from demo");
    }
}
