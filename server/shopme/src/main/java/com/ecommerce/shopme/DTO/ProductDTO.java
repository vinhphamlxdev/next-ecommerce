package com.ecommerce.shopme.dto;

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
public class ProductDTO {
    private Integer id;
    @Column(unique = true, length = 255, nullable = false)
    @NotBlank(message = "Tên sản phẩm không được để trống")
    private String name;
    @Column(name = "price",nullable = false)
    @Min(value = 100000,message = "Giá tối thiểu phải là 100000")
    @Max(value = 1000000, message = "Giá tối đa phải là 1000000")
    private float price;
    private List<MultipartFile> images;
    private boolean isDeleted;
    @Column(name = "quantity",nullable = false)
    @Min(value = 1,message = "số lượng tối thiểu phải là 1")
    @Max(value = 500, message = "số lượng tối đa phải là 500")
    private Integer quantity;
    @Column(length = 512, nullable = false, name = "short_description")
    @NotBlank(message = "Mô tả sản phẩm không được để trống")
    private String description;
    private Integer inStock;
    private Integer categoryId;
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public float getPrice() {
        return price;
    }
    public void setPrice(float price) {
        this.price = price;
    }
    public List<MultipartFile> getImages() {
        return images;
    }
    public void setImages(List<MultipartFile> images) {
        this.images = images;
    }
    public boolean isDeleted() {
        return isDeleted;
    }
    public void setDeleted(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }
    public Integer getQuantity() {
        return quantity;
    }
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public Integer getInStock() {
        return inStock;
    }
    public void setInStock(Integer inStock) {
        this.inStock = inStock;
    }
    public Integer getCategoryId() {
        return categoryId;
    }
    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }
    
    
}
