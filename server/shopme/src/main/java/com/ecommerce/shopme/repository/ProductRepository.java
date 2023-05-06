package com.ecommerce.shopme.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.shopme.Entity.Product;
@Repository
public interface ProductRepository extends JpaRepository<Product,Integer> {
    
}
