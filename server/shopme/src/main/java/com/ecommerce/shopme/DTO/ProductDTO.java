package com.ecommerce.shopme.dto;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ecommerce.shopme.entity.Category;
import com.ecommerce.shopme.entity.Image;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductDTO {
    private Integer id;
    private String name;
    private String shortDescription;

    private String longDescription;

    private float price;

    private Integer quantity;

    private boolean status;
    
    private String slug;

     private List<MultipartFile> images = new ArrayList<>();

     private List<String> sizes;

     private List<String> colors;
     private Category category;


     
}
