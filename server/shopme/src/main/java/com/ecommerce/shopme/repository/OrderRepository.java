package com.ecommerce.shopme.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.shopme.entity.Order;
import com.ecommerce.shopme.entity.OrderDetail;
import com.ecommerce.shopme.entity.Product;

@Repository
public interface OrderRepository extends PagingAndSortingRepository<Order,Integer> {

    Order save(Order order);
      Optional<Order> findById(Integer id);
     
}
