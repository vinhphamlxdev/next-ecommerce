package com.ecommerce.shopme.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.shopme.entity.Size;

@Repository
public interface SizeRepository  extends JpaRepository<Size,Integer> {
    
}
