package com.ecommerce.shopme.DTO;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ecommerce.shopme.Entity.Category;
import com.ecommerce.shopme.Entity.Image;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    private Integer id;
    private String name;
    private float price;
    private List<MultipartFile> images;
    private boolean isDeleted;
    private Integer quantity;
    private String description;
    private Integer inStock;
    private Integer categoryId;
    
}
