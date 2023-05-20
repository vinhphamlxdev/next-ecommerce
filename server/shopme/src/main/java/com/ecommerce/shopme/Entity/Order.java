package com.ecommerce.shopme.Entity;
import java.util.Date;

import com.ecommerce.shopme.User.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
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
    private String status;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
    private float amount;
    public Order(Integer id, String fullName, String address, Integer phoneNumber, String status, Date createdAt,
            float amount) {
        this.id = id;
        this.fullName = fullName;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.status = status;
        this.createdAt = createdAt;
        this.amount = amount;
    }
  @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


    public Order(){

    }
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getFullName() {
        return fullName;
    }
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public Integer getPhoneNumber() {
        return phoneNumber;
    }
    public void setPhoneNumber(Integer phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public Date getOderTime() {
        return createdAt;
    }
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
    public float getAmount() {
        return amount;
    }
    public void setAmount(float amount) {
        this.amount = amount;
    }
    


}
