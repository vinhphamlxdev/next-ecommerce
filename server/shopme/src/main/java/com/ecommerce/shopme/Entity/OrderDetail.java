package com.ecommerce.shopme.entity;

import java.util.List;
import java.util.Optional;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;
import lombok.*;

@Entity
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

public Integer getId() {
    return id;
}

public void setId(Integer id) {
    this.id = id;
}

public Integer getAmount() {
    return amount;
}

public void setAmount(Integer amount) {
    this.amount = amount;
}

public float getPrice() {
    return price;
}

public void setPrice(float price) {
    this.price = price;
}

public float getTotalPrice() {
    return totalPrice;
}

public void setTotalPrice(float totalPrice) {
    this.totalPrice = totalPrice;
}

public Product getProduct() {
    return product;
}

public void setProduct(Product product) {
    this.product = product;
}

public Order getOrder() {
    return order;
}

public void setOrder(Order order) {
    this.order = order;
}

public Color getColor() {
    return color;
}

public void setColor(Color color) {
    this.color = color;
}

public Size getSize() {
    return size;
}

public void setSize(Size size) {
    this.size = size;
}

}
