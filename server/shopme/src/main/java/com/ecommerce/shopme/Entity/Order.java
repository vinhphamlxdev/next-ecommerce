package com.ecommerce.shopme.entity;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.ecommerce.shopme.user.User;

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
    @Column(name = "add_ress", length = 150, nullable = false)
    private String address;
    @Column(name = "phone_number", length = 10, nullable = false)
    private Integer phoneNumber;
    private float productCost;
    private String status;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
    private float amount;

  @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<OrderDetail> orderDetails = new HashSet<>();


}
