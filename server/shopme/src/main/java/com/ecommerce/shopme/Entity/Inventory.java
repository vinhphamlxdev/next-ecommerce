package com.ecommerce.shopme.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.*;

// @Data
// @AllArgsConstructor
// @NoArgsConstructor
// @Entity
// @Table(name = "inventorys")
public class Inventory {
       
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "quantity_instock", length = 128, nullable = false, unique = true)
    private Integer quantityInstock;

    // @OneToOne
    // @JoinColumn(name = "product_id")
    // private Product product;
}
