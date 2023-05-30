package com.ecommerce.shopme.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.ecommerce.shopme.Entity.Order;
import com.ecommerce.shopme.exception.OrderNotFoundException;
import com.ecommerce.shopme.repository.OrderRepository;

@Service
public class OrderService {
   @Autowired
   private OrderRepository orderRepository;
   //get all
   public Page<Order> listAllOrder(Pageable pageable){
    if (pageable.isPaged()) {
        return orderRepository.findAll(pageable);
    } else {
        List<Order> allOrders = orderRepository.findAll(Pageable.unpaged()).getContent();
        return new PageImpl<>(allOrders);
    }
   }
//create order
   public Order createOrder(Order order){
        return orderRepository.save(order);
   }
//get order detail
   public Order getOrderById(Integer id) throws OrderNotFoundException {
    try {
        return orderRepository.findById(id);
    } catch (NoSuchElementException ex) {
        throw new OrderNotFoundException("Khong tim thay order voi id:" + id);
    }
}
//delete order
public void deleteOrder(Integer id){
    orderRepository.deleteById(id);
}

}
