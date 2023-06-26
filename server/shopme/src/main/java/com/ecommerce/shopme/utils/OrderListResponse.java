package com.ecommerce.shopme.utils;

import java.util.List;

import com.ecommerce.shopme.dto.OrderDetail;
import com.ecommerce.shopme.dto.PageResponse;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderListResponse {
    private String status;
    private PageResponse page;
    private List<OrderDetail> orders;
}
