package com.ecommerce.shopme.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ecommerce.shopme.entity.Order;
import com.ecommerce.shopme.entity.Product;

import java.util.List;
import java.util.Optional;
import java.util.Set;


@Repository
public interface ProductRepository extends PagingAndSortingRepository<Product,Integer> {
    Product save(Product product);
    Optional<Product> findById(Integer id);
    @Modifying
    @Query("DELETE  from Product p WHERE p.id = :productId")
    void deleteById(Integer productId);
    boolean existsById(Integer id);
   // Trong ProductRepository
@Query("SELECT p FROM Product p  WHERE p.category.id = :categoryId")
List<Product> findByCategoryId(@Param("categoryId") Integer categoryId);
void delete(Product product);

@Query("SELECT p FROM Product p  WHERE p.name = :name")
Product findByName(String name);
Set<Product> findByOrder(Order order);

Page<Product> findByCategorySlug(String categorySlug, Pageable pageable);

}
   
