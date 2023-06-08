package com.ecommerce.shopme.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategorySummaryDTO {
    private Integer id;
    private String name;
    private String slug;
}
