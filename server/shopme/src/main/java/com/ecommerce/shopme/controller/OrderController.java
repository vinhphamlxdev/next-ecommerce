package com.ecommerce.shopme.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.shopme.dto.CategoryDTO;
import com.ecommerce.shopme.dto.OrderDTO;
import com.ecommerce.shopme.dto.OrderDetailDTO;
import com.ecommerce.shopme.enums.OrderStatus;
import com.ecommerce.shopme.dto.OrderDTO;
import com.ecommerce.shopme.dto.PageResponse;
import com.ecommerce.shopme.entity.Category;
import com.ecommerce.shopme.entity.Color;
import com.ecommerce.shopme.entity.Order;
import com.ecommerce.shopme.entity.OrderDetail;
import com.ecommerce.shopme.entity.Product;
import com.ecommerce.shopme.entity.Size;
import com.ecommerce.shopme.exception.OrderNotFoundException;
import com.ecommerce.shopme.request.OrderRequest;
import com.ecommerce.shopme.response.OrderResponse;
import com.ecommerce.shopme.service.OrderDetailService;
import com.ecommerce.shopme.service.OrderService;
import com.ecommerce.shopme.service.ProductSevice;
import com.ecommerce.shopme.utils.SlugUtils;

import jakarta.annotation.security.RolesAllowed;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
@CrossOrigin(origins = "http://localhost:4000", maxAge = -1,allowedHeaders = "*")
@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;
    @Autowired ProductSevice productSevice;
    @Autowired OrderDetailService orderDetailService;
@RolesAllowed("ROLE_ADMIN")
@GetMapping("/orders")
public ResponseEntity<?> getAllOrder(@RequestParam(defaultValue = "0") int pageNum,
@RequestParam(defaultValue = "5") int itemPerPage, @RequestParam(name  =  "status",required = false) String status){
  Pageable pageable = PageRequest.of(pageNum, itemPerPage);
   Page<Order> orders;
    Map<String, Object> response = new HashMap<>();

  if (status!=null && !status.isEmpty()) {
    orders = orderService.getOrdersByStatus(status, pageable);
  }else{

    orders   = orderService.listAllOrder(pageable);
  }
       List<OrderResponse> orderResponses = orders.stream().map(order->{
           OrderResponse orderResponse = new OrderResponse();
           orderResponse.setId(order.getId());
           orderResponse.setFullName(order.getFullName());
           orderResponse.setEmail(order.getEmail());
           orderResponse.setAddress(order.getAddress());
           orderResponse.setCreatedAt(order.getCreatedAt());
           orderResponse.setPhoneNumber(order.getPhoneNumber());
           orderResponse.setStatus(order.getStatus());
            List<OrderDetail> orderDetails =   orderDetailService.getOrderDetailsByOrderId(order.getId());
            orderResponse.setOrderDetails(orderDetails);
           float total_Price = 0;
            for (OrderDetail orderDetail : orderDetails) {
               total_Price+=orderDetail.getTotalPrice();
            }
            orderResponse.setTotalPrice(total_Price);

           return orderResponse;
       }).collect(Collectors.toList());
       response.put("orders", orderResponses);
            response.put("status", "success");
          PageResponse paggination = new PageResponse<>();
                paggination.setCurrent(orders.getNumber());
                paggination.setItemsPerPage(orders.getSize());
                paggination.setTotalItems(orders.getTotalElements());
                paggination.setTotalPages(orders.getTotalPages());
                response.put("page", paggination);
             return ResponseEntity.ok(response);

}
@RolesAllowed("ROLE_ADMIN")
  @PostMapping("/orders")
  public ResponseEntity<?> createOrder(@RequestBody OrderDTO orderRequest){
    List<Product> insufficientProducts = new ArrayList<>();
    for (OrderDetailDTO orderDetailDTO : orderRequest.getOrderDetails()) {
        Product existProduct = productSevice.getProductById(orderDetailDTO.getProductId());
        float amount = existProduct.getQuantity() - orderDetailDTO.getQuantity();
        if (amount < 0) {
            insufficientProducts.add(existProduct);
        }
    }
    if (!insufficientProducts.isEmpty()) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Sản phẩm không đủ số lượng");
    } else {
        orderService.placeOrder(orderRequest);
        return new ResponseEntity<>("Đặt hàng thành công!", HttpStatus.OK);
    }
  }
  @RolesAllowed("ROLE_ADMIN")
  @GetMapping("/orders/{id}")
public ResponseEntity<?> getOrderDetail(@PathVariable int id) {
    Order existOrder = orderService.getOrderById(id);

    if (existOrder==null) {
      return ResponseEntity.notFound().build();
      
      }
        List<OrderDetail> orderDetails =   orderDetailService.getOrderDetailsByOrderId(id);
        Map<String,Object> response = new HashMap<>();
        OrderResponse order = new OrderResponse();
        order.setId(existOrder.getId());
        order.setFullName(existOrder.getFullName());
        order.setEmail(existOrder.getEmail());
        order.setPhoneNumber(existOrder.getPhoneNumber());
        order.setAddress(existOrder.getAddress());
        order.setCreatedAt(existOrder.getCreatedAt());
        order.setOrderDetails(orderDetails);
        float total_Price = 0;
             for (OrderDetail orderDetail : orderDetails) {
                total_Price+=orderDetail.getTotalPrice();
             }
             order.setTotalPrice(total_Price);
        order.setStatus(existOrder.getStatus());
        response.put("status", "success");
        response.put("order", order);
        
      return ResponseEntity.ok(response);
   
     
}

  @RolesAllowed("ROLE_ADMIN")
    @PutMapping("/orders/{id}")
    public void updateCategory(@PathVariable Integer id, @RequestBody OrderStatus status){
        orderService.updateStatusOrder(id, status);
    }
}
