package com.ecommerce.shopme.utils;

import java.util.List;

import com.ecommerce.shopme.DTO.PageResponse;
import com.ecommerce.shopme.DTO.ProductDetail;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductListResponse {
    private String status;
    private PageResponse page;
    private List<ProductDetail> products;

}
