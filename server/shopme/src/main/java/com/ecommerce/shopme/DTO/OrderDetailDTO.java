package com.ecommerce.shopme.dto;

import java.util.Date;
import java.util.List;

import com.ecommerce.shopme.entity.Order;
import com.ecommerce.shopme.entity.Product;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailDTO {
    private Integer id;
    private Integer totalAmount;
    private String fullName;
    private String email;
    private String address;
    private Integer phoneNumber;
    private String status;
    private List<Product> products;
     private Date createdAt;
     private float totalPrice;
}
