package com.ecommerce.shopme.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.shopme.dto.OrderDetail;
import com.ecommerce.shopme.dto.PageResponse;
import com.ecommerce.shopme.entity.Order;
import com.ecommerce.shopme.exception.OrderNotFoundException;
import com.ecommerce.shopme.service.OrderService;
import com.ecommerce.shopme.utils.CustomResponse;
import com.ecommerce.shopme.utils.OrderListResponse;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class OrderController {
    
    @Autowired
    private OrderService orderService;

//GET
@GetMapping("/orders")
public ResponseEntity<?> getAllOrder(@RequestParam(defaultValue = "0") int pageNum,
@RequestParam(defaultValue = "2") int itemPerPage){
        Pageable pageable = PageRequest.of(pageNum, itemPerPage);
        Page<Order> orders = orderService.listAllOrder(pageable);
          // Tạo danh sách OrderResponse từ danh sách order
          List<OrderDetail> orderRes = orders.stream()
          .map(order -> {
              OrderDetail orderDetail = new OrderDetail();
              orderDetail.setId(order.getId());
              orderDetail.setFullName(order.getFullName());
              orderDetail.setAddress(order.getAddress());
            orderDetail.setAmount(order.getAmount());
            orderDetail.setCreatedAt(order.getCreatedAt());
            orderDetail.setPhoneNumber(order.getPhoneNumber());
            orderDetail.setStatus(order.getStatus());
            orderDetail.setUser(order.getUser());
              return orderDetail;
          })
          .collect(Collectors.toList());
          OrderListResponse ordersResponse = new OrderListResponse();
          ordersResponse.setStatus("Success");
          ordersResponse.setOrders(orderRes);
          ordersResponse.setPage(new PageResponse<>(orders.getNumber(),
           orders.getSize(),
            orders.getNumberOfElements(),
             orders.getTotalPages()));
             return ResponseEntity.ok(ordersResponse);
  
  
    
}

@GetMapping("/orders/{id}")
public ResponseEntity<Order> getProductById(@PathVariable int id) throws OrderNotFoundException{
    Order product = orderService.getOrderById(id);
    if (product!=null) {
        return ResponseEntity.ok(product);
    }else{
        return ResponseEntity.notFound().build();
    }
}
    //POST
    @PostMapping("/orders")
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        Order createOrder = orderService.createOrder(order);
        return new ResponseEntity<>(createOrder, HttpStatus.CREATED);
    }
  //DELETE
  @DeleteMapping("/orders/{id}")
  public void deleteOrder(@PathVariable Integer id){
    orderService.deleteOrder(id);
  }


}
