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
@Data 
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

  
    @JsonIgnore
   @OneToOne
    private Product product;


}
