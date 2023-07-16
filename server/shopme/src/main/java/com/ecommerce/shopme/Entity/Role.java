package com.ecommerce.shopme.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "roles")
public class Role {
   @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
     
    @Column(nullable = false, length = 50, unique = true)
    private String name;
 
    public Role() { }
     
    public Role(String name) {
        this.name = name;
    }
     
    public Role(Integer id) {
        this.id = id;
    }
       
    public Role(Integer id,String name) {
        this.id = id;
        this.name = name;
    }
 
    @Override
    public String toString() {
        return this.name;
    }
     
}