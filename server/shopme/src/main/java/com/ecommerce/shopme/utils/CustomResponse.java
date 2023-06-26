package com.ecommerce.shopme.utils;

import java.util.List;

import com.ecommerce.shopme.dto.CategoryDetail;
import com.ecommerce.shopme.dto.PageResponse;

import lombok.*;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class CustomResponse {
    private String status;
    private PageResponse page;
    private List<CategoryDetail> categorys;
   

}
