package com.ecommerce.shopme.controller;

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
import com.ecommerce.shopme.Entity.Order;
import com.ecommerce.shopme.exception.OrderNotFoundException;
import com.ecommerce.shopme.service.OrderService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class OrderController {
    
    @Autowired
    private OrderService orderService;

//GET
@GetMapping("/orders")
public ResponseEntity<Page<Order>> getAllOrder(@RequestParam(defaultValue = "0") int pageNum,
@RequestParam(defaultValue = "3") int pageSize){
    Pageable pageable = PageRequest.of(pageNum, pageSize);
    Page<Order> orders = orderService.listAllOrder(pageable);
    return ResponseEntity.ok(orders);
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
