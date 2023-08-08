package com.ecommerce.shopme.controller;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.shopme.dto.DashboardDTO;
import com.ecommerce.shopme.service.OrderService;
import com.ecommerce.shopme.service.UserService;

import jakarta.annotation.security.RolesAllowed;

@CrossOrigin(origins = "http://localhost:4000", maxAge = -1,allowedHeaders = "*")
@RestController
public class Dashboard {


        @Autowired
        OrderService orderService;
        @Autowired 
        UserService userService;
        @RolesAllowed("ROLE_ADMIN")
    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboard(){
        DashboardDTO newDashboardDTO = new DashboardDTO();
        newDashboardDTO.setOrderDelivery(orderService.getDeliveryOrders());
        newDashboardDTO.setOrderPending(orderService.getPendingOrders());
        newDashboardDTO.setTotalRenenue(orderService.getTotalRevenue());
        newDashboardDTO.setTotalUser(userService.getTotalUser());
             Map<String,Object> response = new HashMap<>();
            response.put("dashboard", newDashboardDTO); 
             response.put("status", "success");    
            return ResponseEntity.ok(response);
    }
    
}
