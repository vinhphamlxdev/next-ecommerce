package com.ecommerce.shopme.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ecommerce.shopme.entity.Size;

@Repository
public interface SizeRepository  extends JpaRepository<Size,Integer> {
   List<Size> findByProductId(Integer productId);

     
}
