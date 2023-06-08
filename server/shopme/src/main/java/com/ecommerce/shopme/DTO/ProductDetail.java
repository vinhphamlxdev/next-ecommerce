package com.ecommerce.shopme.DTO;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import com.ecommerce.shopme.Entity.Category;
import com.ecommerce.shopme.Entity.Product;
import lombok.*;

@NoArgsConstructor
public class ProductDetail {
    private Integer id;
    private String name;
    private float price;
    private List<String> imageUrls;
    private boolean isDeleted;
    private Integer quantity;
    private String description;
    private Integer inStock;
    private List<CategorySummaryDTO> categorys;
    public ProductDetail(Integer id, String name, float price, List<String> imageUrls, boolean isDeleted,
            Integer quantity, String description, Integer inStock, List<CategorySummaryDTO> categorys) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageUrls = imageUrls;
        this.isDeleted = isDeleted;
        this.quantity = quantity;
        this.description = description;
        this.inStock = inStock;
        this.categorys = categorys;
    }
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
    public List<String> getImageUrls() {
        return imageUrls;
    }
    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
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
    public List<CategorySummaryDTO> getCategorys() {
        return categorys;
    }
    public void setCategorys(List<CategorySummaryDTO> categorys) {
        this.categorys = categorys;
    }


}
