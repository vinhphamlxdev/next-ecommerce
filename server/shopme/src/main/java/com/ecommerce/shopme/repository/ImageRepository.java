package com.ecommerce.shopme.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ecommerce.shopme.entity.Image;

import java.util.List;


@Repository
public interface ImageRepository extends JpaRepository<Image,Integer>  {
    List<Image> findByProductId(Integer productId);
}
