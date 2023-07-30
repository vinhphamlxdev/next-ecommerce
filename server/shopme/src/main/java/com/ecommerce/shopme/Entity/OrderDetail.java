package com.ecommerce.shopme.entity;

import java.util.List;
import java.util.Optional;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore
    private Integer id;
    private Integer amount;
	private float price;
    private float totalPrice;
    @ManyToOne
	@JoinColumn(name = "product_id")
    // @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private Product product;
    @ManyToOne
	@JoinColumn(name = "order_id")
    // @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @JsonIgnore
	private Order order;
       
  @ManyToOne
  @JoinColumn(name = "color_id")
  private Color color;

  @ManyToOne
  @JoinColumn(name = "size_id")
  private Size size;

}
