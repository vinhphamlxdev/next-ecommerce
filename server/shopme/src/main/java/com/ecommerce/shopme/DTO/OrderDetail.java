package com.ecommerce.shopme.DTO;

import java.util.Date;

import com.ecommerce.shopme.User.User;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetail {
    private Integer id;
    private String fullName;
    private String address;
    private Integer phoneNumber;
    private float productCost;
    private String status;
    private Date createdAt;
    private float amount;
    private User user;
}
