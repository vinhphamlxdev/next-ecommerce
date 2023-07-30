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
    private Integer productId;
    private Integer colorId;
    private Integer sizeId;
    private Integer quantity;
    private float price;
    private Integer totalAmount;
    private String status;
     private Date createdAt;
     private float totalPrice;
}
