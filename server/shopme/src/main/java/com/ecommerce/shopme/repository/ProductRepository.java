package com.ecommerce.shopme.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.shopme.Entity.Product;
import java.util.List;


@Repository
public interface ProductRepository extends PagingAndSortingRepository<Product,Integer> {
    Product save(Product product);
    Product  findById(Integer id);
    Product deleteById(Integer id);
    @Query("UPDATE Product p SET p.isDeleted =?2 WHERE p.id= ?1")
    @Modifying
    public void updateEnabledStatus(Integer id, boolean isDeleted);
}
