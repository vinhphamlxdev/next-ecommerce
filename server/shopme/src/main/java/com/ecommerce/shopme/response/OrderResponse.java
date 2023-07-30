package com.ecommerce.shopme.response;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.ecommerce.shopme.entity.OrderDetail;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponse {
        private Integer id;
    private String fullName;
    private String address;
    private String email;
    private String phoneNumber;
    private String status;
    private float totalPrice;
     private Date createdAt;
    private List<OrderDetail> orderDetails;
}
