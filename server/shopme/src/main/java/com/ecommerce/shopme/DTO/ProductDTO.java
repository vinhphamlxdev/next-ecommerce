package com.ecommerce.shopme.DTO;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ecommerce.shopme.Entity.Category;

public class ProductDTO {
    private Integer id;
    private String name;
    private String slug;
    private String description;
    private float price;
    private Integer quantity;
    private boolean inStock;
    private boolean isDeleted;
    private List<MultipartFile> images;
    private List<String> imageUrls;
    private Category category;
    

    public ProductDTO(){
        
    }

    // constructor
    public ProductDTO(Integer id, String name, String slug, String description, float price, Integer quantity, boolean inStock, boolean isDeleted, List<MultipartFile> images, List<String> imageUrls, Category category) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.inStock = inStock;
        this.isDeleted = isDeleted;
        this.images = images;
        this.imageUrls = imageUrls;
        this.category = category;
    }


    // getters and setters
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

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public boolean isInStock() {
        return inStock;
    }

    public void setInStock(boolean inStock) {
        this.inStock = inStock;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    public List<MultipartFile> getImages() {
        return images;
    }

    public void setImages(List<MultipartFile> images) {
        this.images = images;
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
