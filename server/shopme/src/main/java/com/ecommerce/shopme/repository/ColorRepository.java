package com.ecommerce.shopme.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.shopme.entity.Color;

@Repository
public interface ColorRepository extends JpaRepository<Color,Integer> {
    
}
