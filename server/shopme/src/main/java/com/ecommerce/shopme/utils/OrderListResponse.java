package com.ecommerce.shopme.utils;

import java.util.List;

import com.ecommerce.shopme.dto.OrderDTO;
import com.ecommerce.shopme.dto.OrderDetailDTO;
import com.ecommerce.shopme.dto.OrderDTO;
import com.ecommerce.shopme.dto.PageResponse;
import com.ecommerce.shopme.entity.OrderDetail;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderListResponse {
    private String status;
    private PageResponse page;
    private List<OrderDetailDTO> orders;
}
