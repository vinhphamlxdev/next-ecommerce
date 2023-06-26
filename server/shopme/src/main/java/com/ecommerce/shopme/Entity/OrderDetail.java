package com.ecommerce.shopme.entity;

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
	private float productCost;
    @ManyToOne
	@JoinColumn(name = "product_id")
	private Product product;
    @ManyToOne
	@JoinColumn(name = "order_id")
	private Order order;
}
