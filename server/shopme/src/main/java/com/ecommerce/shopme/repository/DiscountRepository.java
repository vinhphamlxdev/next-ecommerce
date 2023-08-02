package com.ecommerce.shopme.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.shopme.entity.Discount;

@Repository
public interface DiscountRepository extends JpaRepository<Discount,Integer> {
   Discount findByProductId(Integer productId);
   
}