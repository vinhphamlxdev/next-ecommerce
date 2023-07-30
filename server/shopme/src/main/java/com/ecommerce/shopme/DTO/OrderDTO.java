package com.ecommerce.shopme.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.ecommerce.shopme.entity.Product;
import com.ecommerce.shopme.entity.User;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
  
    private String fullName;
    private String address;
    private String email;
    private String phoneNumber;
    private Date createdAt;
    private List<OrderDetailDTO> orderDetails;
    private User user;
  
}
