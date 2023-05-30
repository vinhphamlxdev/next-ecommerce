package com.ecommerce.shopme.Entity;

import java.util.Date;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.validator.constraints.Length;

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
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
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
    // @Column(name = "created_time")
    // @CreationTimestamp
	// private Date createdAt;
    // @Column(name = "updated_time",nullable = false, updatable = false)
    // @UpdateTimestamp
	// private Date updatedAt;
    @Column(length = 512, nullable = false, name = "short_description")
    @NotBlank(message = "Mô tả sản phẩm không được để trống")
    private String description;

    @Column(name = "price",nullable = false)
    @Min(value = 120,message = "Giá tối thiểu phải là 120")
    @Max(value = 200, message = "Giá tối đa phải là 200")
    private float price;

    @Column(name = "quantity",nullable = false)
    @Min(value = 5,message = "số lượng tối thiểu phải là 5")
    @Max(value = 100, message = "số lượng tối đa phải là 200")
    private Integer quantity;
    @Column(name = "in_stock")
    private boolean inStock;
    @Column(name = "is_deleted")
    private boolean isDeleted;

    @ElementCollection
    private List<String> imageUrls;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    @NotNull(message = "Danh muc không được để trống")
    private Category category;




    // Getters and setters

}

