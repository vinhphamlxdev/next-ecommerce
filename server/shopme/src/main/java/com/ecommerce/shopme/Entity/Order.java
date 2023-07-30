package com.ecommerce.shopme.entity;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.ecommerce.shopme.enums.OrderStatus;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "full_name", length = 45, nullable = false)
    private String fullName;
    @Column(name = "address", length = 150, nullable = false)
    private String address;
    private String email;
    @Column(name = "phone_number", length = 11, nullable = false)
    private String phoneNumber;
    private String status;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

  @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<OrderDetail> orderDetails = new HashSet<>();



}
