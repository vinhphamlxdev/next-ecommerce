package com.ecommerce.shopme.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ecommerce.shopme.entity.Order;
import com.ecommerce.shopme.entity.Product;
import com.ecommerce.shopme.exception.OrderNotFoundException;
import com.ecommerce.shopme.repository.OrderRepository;
import com.ecommerce.shopme.repository.ProductRepository;

@Service
public class OrderService {
   @Autowired
   private OrderRepository orderRepository;
   @Autowired 
   ProductRepository productRepository;
//    //get all
   public Page<Order> listAllOrder(Pageable pageable){
    if (pageable.isPaged()) {
        return orderRepository.findAll(pageable);
    } else {
        List<Order> allOrders = orderRepository.findAll(Pageable.unpaged()).getContent();
        return new PageImpl<>(allOrders);
    }
   }
//create order
   public int saveOrder(Order order){
        Order saveOrderTodb =  orderRepository.save(order);
        return saveOrderTodb.getId();
   }
// //get order detail
public Order getOrderById(Integer id) {
        
   return orderRepository.findById(id).get();
}
// //delete order
// public void deleteOrder(Integer id){
//     orderRepository.deleteById(id);
// }


}
