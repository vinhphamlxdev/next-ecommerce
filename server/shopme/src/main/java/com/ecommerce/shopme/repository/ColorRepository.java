package com.ecommerce.shopme.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.shopme.entity.Color;
import com.ecommerce.shopme.entity.Size;

@Repository
public interface ColorRepository extends JpaRepository<Color,Integer> {
         List<Color> findByProductId(Integer productId);

}
