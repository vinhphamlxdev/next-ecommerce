package com.ecommerce.shopme.entity;

import org.hibernate.validator.constraints.Length;

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
@Table(name = "sizes")
public class Size {
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
     @Column(length = 10, nullable = false, unique = false)
    @NotBlank(message = "size khong duoc de trong")
    @Length(min = 1,max = 3, message = "Tên size tối thiểu 1 kí tự và tối đa là 3 kí tự")
    private String name;
   
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}
