package com.ecommerce.shopme.dto;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import com.ecommerce.shopme.entity.Category;
import com.ecommerce.shopme.entity.Color;
import com.ecommerce.shopme.entity.Image;
import com.ecommerce.shopme.entity.Product;
import com.ecommerce.shopme.entity.Size;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDetail {
    private String name;
    private String shortDescription;
    private float price;
    private Integer quantity;
    private boolean status;
    private String slug;
    private Category category;
    private List<String> colors;
    private List<String> sizes;
    private List<String> imageUrls;

}
