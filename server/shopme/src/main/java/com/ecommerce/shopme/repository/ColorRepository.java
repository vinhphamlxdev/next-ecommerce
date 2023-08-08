package com.ecommerce.shopme.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ecommerce.shopme.entity.Color;
import com.ecommerce.shopme.entity.Product;
import com.ecommerce.shopme.entity.Size;

@Repository
public interface ColorRepository extends JpaRepository<Color,Integer> {
         List<Color> findByProductId(Integer productId);

// SELECT p.*
// FROM products p
// JOIN colors c ON p.id = c.product_id
// WHERE c.color_name = 'Tên màu cần tìm';

@Query("SELECT p FROM Product p " +
"JOIN p.colors c " +
"WHERE c.colorName = :colorName")
    Page<Product> findProductsByColorName(String colorName,Pageable pageable);

//     SELECT p.* FROM products p
// JOIN colors c ON p.id = c.product_id
// JOIN categories cat ON p.category_id = cat.id
// WHERE cat.slug = 't-shirt' AND c.color_name = 'blue';
@Query("SELECT p FROM Product p " +
"JOIN p.colors c " +
"JOIN p.category cat " +
"WHERE cat.slug = :categorySlug AND c.colorName = :colorName")
Page<Product> findByCategorySlugAndColorName(String categorySlug, String colorName, Pageable pageable);
}
