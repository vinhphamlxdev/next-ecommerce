package com.ecommerce.shopme.Entity;

import java.util.List;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;


@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, length = 255, nullable = false)
    @NotBlank(message = "Tên sản phẩm không được để trống")
    private String name;

    @Lob
    @Column(unique = true, length = 255, nullable = false)
    @NotBlank(message = "Loại sản phẩm không được để trống")
    private String slug;

    @Column(length = 512, nullable = false, name = "short_description")
    @NotBlank(message = "Mô tả sản phẩm không được để trống")
    private String description;

    @Column(name = "price")
    private float price;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "in_stock")
    private boolean inStock;

    @Column(name = "is_deleted")
    private boolean isDeleted;

    @ElementCollection
    private List<String> imageUrls;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    public Product() {
        
    }

    public Product(String name, String slug, String description, float price, Integer quantity, boolean inStock, boolean isDeleted, List<String> imageUrls, Category category) {
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.inStock = inStock;
        this.isDeleted = isDeleted;
        this.imageUrls = imageUrls;
        this.category = category;
    }

    // Getters and setters

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

