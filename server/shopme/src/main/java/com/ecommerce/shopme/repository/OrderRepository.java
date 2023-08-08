package com.ecommerce.shopme.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.shopme.entity.Order;
import com.ecommerce.shopme.entity.OrderDetail;
import com.ecommerce.shopme.entity.Product;

@Repository
public interface OrderRepository extends PagingAndSortingRepository<Order,Integer> {

    Order save(Order order);
      Optional<Order> findById(Integer id);

      @Query("SELECT o FROM Order o WHERE o.status = :status")
      Page<Order> findByStatus(String status, Pageable pageable);

      @Query("SELECT COUNT(o) FROM Order o WHERE o.status = 'PENDING'")
      long countPendingOrders();
       @Query("SELECT COUNT(o) FROM Order o WHERE o.status = 'DELIVERY'")
      long countDeliveryOrders();
      // long countByStatus(String status);

}
