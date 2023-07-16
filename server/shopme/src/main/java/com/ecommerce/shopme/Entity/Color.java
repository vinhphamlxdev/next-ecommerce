package com.ecommerce.shopme.entity;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "colors")
public class Color {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "color_name",length = 128, nullable = false, unique = false)
    @NotBlank(message = "Tên danh mục không được để trống")
    private String colorName;
   
    private boolean isDelete;
    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Product product;
}
