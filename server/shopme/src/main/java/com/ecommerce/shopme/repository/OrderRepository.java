package com.ecommerce.shopme.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.shopme.entity.Order;

@Repository
public interface OrderRepository extends PagingAndSortingRepository<Order,Integer> {
    Order save(Order order);
    Order  findById(Integer id);
    void deleteById(Integer id);
}
