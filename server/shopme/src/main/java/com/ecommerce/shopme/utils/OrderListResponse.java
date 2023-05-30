package com.ecommerce.shopme.utils;

import java.util.List;

import com.ecommerce.shopme.DTO.OrderDetail;
import com.ecommerce.shopme.DTO.PageResponse;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderListResponse {
    private String status;
    private PageResponse page;
    private List<OrderDetail> orders;
}
