package com.ecommerce.shopme.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardDTO {
    private  long orderPending;
    private  long orderDelivery;
    private   BigDecimal totalRenenue;
    private long totalUser;
}
