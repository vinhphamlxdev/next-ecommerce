package com.ecommerce.shopme.dto;

import org.hibernate.validator.constraints.Length;

import com.ecommerce.shopme.entity.Category;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {
     @NotBlank(message = "Tên danh mục không được để trống")
    @Length(min = 5,max = 40, message = "Tên danh mục tối thiểu 5 kí  tự tối đa 40 kí tự")
    private String name;
    @NotBlank(message = "Mô tả danh mục không được để trống")
    private String description;

}
