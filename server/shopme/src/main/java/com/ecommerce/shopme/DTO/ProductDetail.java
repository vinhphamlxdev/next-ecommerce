package com.ecommerce.shopme.DTO;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import com.ecommerce.shopme.Entity.Category;
import com.ecommerce.shopme.Entity.Product;
import lombok.*;

@NoArgsConstructor
@Data
public class ProductDetail {
    private Integer id;
    private String name;
    private float price;
    private List<String> imageUrls;
    private boolean isDeleted;
    private Integer quantity;
    private String description;
    private boolean inStock;
    private Category category;
 
    
    public ProductDetail(Integer id, String name, float price, List<String> imageUrls, boolean isDeleted,
             String description, boolean inStock, Category category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageUrls = imageUrls;
        this.isDeleted = isDeleted;
        this.description = description;
        this.inStock = inStock;
        this.category = category;
    }



}
