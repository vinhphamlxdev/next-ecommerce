package com.ecommerce.shopme.entity;

import java.time.LocalDate;
import java.util.List;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
@Entity 
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Discounts")
public class Discount {
      
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "product_name", length = 128, unique = true)
    @NotBlank(message = "Tên sản phẩm không được để trống")
    @Length(min = 10,max = 50, message = "Tên danh mục tối thiểu 10 kí tự và tối đa là 50 kí tự")
    private String productName;

    @Column(name = "original_price")
    @Min(value = 0,message = "Giá tối thiểu phải là 0")
    private float originalPrice;

     @Column(name = "discount_price")
    @Min(value = 0,message = "Giá tối thiểu phải là 0")
    private float discountPrice;

    @Column(name = "discount_percent")
    private String discountPercent;

    @JsonIgnore
   @OneToOne
    private Product product;

    public String discountPercent(){
        return ((this.discountPrice * 100) / this.originalPrice)+"%";
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public float getOriginalPrice() {
        return originalPrice;
    }

    public void setOriginalPrice(float originalPrice) {
        this.originalPrice = originalPrice;
    }

    public float getDiscountPrice() {
        return discountPrice;
    }

    public void setDiscountPrice(float discountPrice) {
        this.discountPrice = discountPrice;
       
    }

    public String getDiscountPercent() {
        return discountPercent;
    }

    // public void setDiscountPercent(String discountPercent) {
    //     this.discountPercent = discountPercent;
    // }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
    public void setDiscountPercent(float originalPrice, float discountPrice ) {
        if (originalPrice != 0) {
            int discountPercentage = Math.round((discountPrice * 100) / originalPrice);
            this.discountPercent = String.format("%d%%", discountPercentage);
        } 
        
        else {
            this.discountPercent = "0%"; // Handle division by zero case
        }
    }
}
