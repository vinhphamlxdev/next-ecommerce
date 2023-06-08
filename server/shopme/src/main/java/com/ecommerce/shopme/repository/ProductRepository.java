package com.ecommerce.shopme.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ecommerce.shopme.Entity.Product;
import java.util.List;
import java.util.Optional;


@Repository
public interface ProductRepository extends PagingAndSortingRepository<Product,Integer> {
    Product save(Product product);
    // @Query("SELECT p FROM Product p WHERE p.id = :productId")
    Optional<Product> findById(Integer id);
    @Modifying
    @Query("DELETE  from Product p WHERE p.id = :productId")
    void deleteById(Integer productId);
    boolean existsById(Integer id);

}
   
