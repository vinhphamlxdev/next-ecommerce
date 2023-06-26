package com.ecommerce.shopme.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class CategoryDetail {
    private Integer id;
    private String name;
    private String slug;
    private String description;

}
