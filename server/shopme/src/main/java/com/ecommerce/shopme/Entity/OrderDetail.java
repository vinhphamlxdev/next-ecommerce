package com.ecommerce.shopme.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "order_details")
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer amount;
	private float price;
    @ManyToOne
	@JoinColumn(name = "product_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private Product product;
    @ManyToOne
	@JoinColumn(name = "order_id")
	private Order order;
}
