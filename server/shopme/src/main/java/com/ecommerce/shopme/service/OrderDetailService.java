package com.ecommerce.shopme.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.shopme.entity.Order;
import com.ecommerce.shopme.entity.OrderDetail;
import com.ecommerce.shopme.repository.OrderDetailRepository;
import com.ecommerce.shopme.repository.OrderRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
@Service
public class OrderDetailService {
    @Autowired
    OrderDetailRepository orderDetailRepository;

       public Page<OrderDetail> listAllOrder(Pageable pageable){
    if (pageable.isPaged()) {
        return orderDetailRepository.findAll(pageable);
    } else {
        List<OrderDetail> allOrders = orderDetailRepository.findAll(Pageable.unpaged()).getContent();
        return new PageImpl<>(allOrders);
    }
   }
    public OrderDetail saveOrderDetail(OrderDetail orderDetail){
        return orderDetailRepository.save(orderDetail);
    }
    public OrderDetail getOrderDetailById(Integer id) {
        
   return orderDetailRepository.findById(id).get();
}
public List<Order> getOrderDetailByOrder(Order order){
    return orderDetailRepository.findByOrder(order);
}
public List<OrderDetail> getOrderDetailsByOrderId(Integer orderId) {
    return orderDetailRepository.findByOrderId(orderId);
}

}

