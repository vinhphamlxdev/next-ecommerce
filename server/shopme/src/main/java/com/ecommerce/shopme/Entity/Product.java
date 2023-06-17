package com.ecommerce.shopme.Entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.validator.constraints.Length;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, length = 255, nullable = false)
    @NotBlank(message = "Tên sản phẩm không được để trống")
    @Length(min = 10,max = 70, message = "Tên sản phẩm tối thiểu 10 kí tự và tối đa là 70 kí tự")
    private String name;
    @Lob
    @Column(unique = true)
    private String slug;
    
    @Column(length = 512, nullable = false, name = "short_description")
    @NotBlank(message = "Mô tả sản phẩm không được để trống")
    private String description;

    @Column(name = "price",nullable = false)
    @Min(value = 100000,message = "Giá tối thiểu phải là 100000")
    @Max(value = 1000000, message = "Giá tối đa phải là 1000000")
    private float price;

    @Column(name = "quantity",nullable = false)
    @Min(value = 1,message = "số lượng tối thiểu phải là 1")
    @Max(value = 500, message = "số lượng tối đa phải là 500")
    private Integer quantity;

    @Column(name = "in_stock")
    private Integer inStock;

    @Column(name = "is_deleted")
    private boolean isDeleted;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Image> images;
    
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "product_category",
               joinColumns = @JoinColumn(name = "product_id"),
               inverseJoinColumns = @JoinColumn(name = "category_id"))
    private List<Category> categories;

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

    public Integer getInStock() {
        return inStock;
    }

    public void setInStock(Integer inStock) {
        this.inStock = inStock;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }

    public List<Category> getCategorys() {
        return categories;
    }

    public void setCategorys(List<Category> categorys) {
        this.categories = categorys;
    }

 




}

