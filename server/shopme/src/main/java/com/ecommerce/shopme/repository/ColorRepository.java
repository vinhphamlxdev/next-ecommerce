package com.ecommerce.shopme.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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
"WHERE c.colorName = :colorName AND c.isDelete=0 AND p.isDelete=0")
    Page<Product> findProductsByColorName(String colorName,Pageable pageable);

//     SELECT p.* FROM products p
// JOIN colors c ON p.id = c.product_id
// JOIN categories cat ON p.category_id = cat.id
// WHERE cat.slug = 't-shirt' AND c.color_name = 'blue';
@Query("SELECT p FROM Product p " +
"JOIN p.colors c " +
"JOIN p.category cat " +
"WHERE cat.slug = :categorySlug AND c.colorName = :colorName AND c.isDelete = 0 AND p.isDelete=0" )
Page<Product> findByCategorySlugAndColorName(String categorySlug, String colorName, Pageable pageable);

@Query("SELECT p, d, c, m.name " +
       "FROM Product p " +
       "JOIN p.discount d " +
       "LEFT JOIN p.colors c " +
       "LEFT JOIN p.category m " +
       "WHERE (:color IS NULL OR (c.colorName = :color AND c.isDelete = 0)) " +
       "AND (:category IS NULL OR m.slug = :category) " +
       "AND p.isDelete=0 "+
       "AND (:discountPrice IS NULL OR d.discountPrice > 0)")
Page<Product> findByCategorySlugAndColorNameAndDiscount(
   String category,
 String color,
  Float discountPrice,
    Pageable pageable);

    //lay ta ca san pham sale
    @Query("SELECT p FROM Product p " +
    "WHERE (:discountPrice IS NULL OR p.discount.discountPrice > 0) " +
    "AND p.isDelete=0 "
   )
Page<Product> findAllProductByDiscount(
 @Param("discountPrice") Float discountPrice,
 Pageable pageable);

//get discout theo categoryslug
@Query("SELECT p FROM Product p " +
       "JOIN p.category c " +
       "JOIN p.discount d " +
       "WHERE (:category IS NULL OR c.slug = :category) " +
       "AND p.isDelete=0 "+
       "AND (COALESCE(:discountPrice, 0) = 0 OR d.discountPrice > 0) ")
Page<Product> findByCategorySlugAndDiscount(
    @Param("category") String categorySlug,
    @Param("discountPrice") Float discountPrice,
    Pageable pageable);
//get discount theo color
@Query("SELECT p FROM Product p " +
"JOIN p.colors c " +
"JOIN p.discount d " +
"WHERE (:colorName IS NULL OR (c.colorName = :colorName AND c.isDelete = 0) ) " +
"AND (:discountPrice IS NULL OR d.discountPrice > 0) " +
"AND p.isDelete=0 "
)
Page<Product> findByColorNameAndDiscount(
@Param("colorName") String colorName,
@Param("discountPrice") Float discountPrice,
Pageable pageable);
}
