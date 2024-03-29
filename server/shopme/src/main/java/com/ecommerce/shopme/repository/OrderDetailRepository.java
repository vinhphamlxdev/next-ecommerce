package com.ecommerce.shopme.repository;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ecommerce.shopme.entity.Order;
import com.ecommerce.shopme.entity.OrderDetail;
@Repository
public interface OrderDetailRepository  extends JpaRepository<OrderDetail,Integer>{
        OrderDetail save(OrderDetail orderDetail);
        Optional<OrderDetail> findById(Integer id);
        List<Order> findByOrder(Order order);
       List<OrderDetail> findByOrderId(Integer orderId);
       
       @Query("SELECT od FROM OrderDetail od WHERE od.product.id = :productId")
       OrderDetail findByProductId(Integer productId);

        //tinh tong doanh thu
        @Query("SELECT SUM(od.totalPrice) FROM OrderDetail od WHERE od.order.status = 'COMPLETED'")
        BigDecimal calculateTotalRevenue();

        
}

