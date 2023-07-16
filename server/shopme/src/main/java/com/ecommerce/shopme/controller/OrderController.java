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
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.shopme.dto.OrderDTO;
import com.ecommerce.shopme.dto.OrderDetailDTO;
import com.ecommerce.shopme.enums.OrderStatus;

import com.ecommerce.shopme.dto.OrderDTO;
import com.ecommerce.shopme.dto.PageResponse;
import com.ecommerce.shopme.entity.Order;
import com.ecommerce.shopme.entity.OrderDetail;
import com.ecommerce.shopme.entity.Product;
import com.ecommerce.shopme.exception.OrderNotFoundException;
import com.ecommerce.shopme.service.OrderDetailService;
import com.ecommerce.shopme.service.OrderService;
import com.ecommerce.shopme.service.ProductSevice;
import com.ecommerce.shopme.utils.CustomResponse;
import com.ecommerce.shopme.utils.OrderListResponse;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin(origins = "http://localhost:4000", maxAge = -1)
@RestController
public class OrderController {
    
    @Autowired
    private OrderService orderService;
    @Autowired ProductSevice productSevice;
    @Autowired OrderDetailService orderDetailService;

//GET
@GetMapping("/orders")
public ResponseEntity<?> getAllOrder(@RequestParam(defaultValue = "0") int pageNum,
@RequestParam(defaultValue = "5") int itemPerPage){
        Pageable pageable = PageRequest.of(pageNum, itemPerPage);
        Page<Order> orders = orderService.listAllOrder(pageable);
          // Tạo danh sách OrderResponse từ danh sách order
          List<OrderDetailDTO> orderDetailDTOs = orders.stream()
          .map(order -> {
            OrderDetailDTO orderDetailDTO = new OrderDetailDTO();
            orderDetailDTO.setId(order.getId());
            orderDetailDTO.setFullName(order.getFullName());
              orderDetailDTO.setEmail(order.getEmail());
              orderDetailDTO.setAddress(order.getAddress());
              orderDetailDTO.setPhoneNumber(order.getPhoneNumber());
              orderDetailDTO.setCreatedAt(order.getCreatedAt());
              List<OrderDetail> orderDetails = orderDetailService.getOrderDetailsByOrderId(order.getId());
              List<Product> products = new ArrayList<>();
    int totalQuantity= 0;
    float totalPrice = 0.0f;
      for (OrderDetail orderDetail : orderDetails) {
        Product product = orderDetail.getProduct();
        product.setQuantity(orderDetail.getAmount());
        products.add(product);
               totalQuantity+=product.getQuantity();
               totalPrice+=product.getPrice()*product.getQuantity();

      }
       orderDetailDTO.setProducts(products);
      orderDetailDTO.setTotalAmount(totalQuantity);
      orderDetailDTO.setTotalPrice(totalPrice);
            return orderDetailDTO;
          })
          .collect(Collectors.toList());
          OrderListResponse ordersResponse = new OrderListResponse();
          ordersResponse.setStatus("Success");
          ordersResponse.setOrders(orderDetailDTOs);
          ordersResponse.setPage(new PageResponse<>(orders.getNumber(),
           orders.getSize(),
            orders.getNumberOfElements(),
             orders.getTotalPages()));
             return ResponseEntity.ok(ordersResponse);

}

@GetMapping("/orders/{id}")
public ResponseEntity<?> getOrderDetail(@PathVariable int id) throws OrderNotFoundException{
    Order existOrder = orderService.getOrderById(id);

    if (existOrder==null) {
      return ResponseEntity.notFound().build();
      
      }
    List<OrderDetail> orderDetails =   orderDetailService.getOrderDetailsByOrderId(id);
    List<Product> products = new ArrayList<>();
    int totalQuantity= 0;
    float totalPrice = 0.0f;
      for (OrderDetail orderDetail : orderDetails) {
        Product product = orderDetail.getProduct();
        product.setQuantity(orderDetail.getAmount());
        products.add(product);
               totalQuantity+=product.getQuantity();
               totalPrice+=product.getPrice()*product.getQuantity();

      }
      OrderDetailDTO orderDetailDTO = new OrderDetailDTO();
      orderDetailDTO.setId(existOrder.getId());
      orderDetailDTO.setFullName(existOrder.getFullName());
      orderDetailDTO.setEmail(existOrder.getEmail());
      orderDetailDTO.setAddress(existOrder.getAddress());
      orderDetailDTO.setPhoneNumber(existOrder.getPhoneNumber());
      orderDetailDTO.setCreatedAt(existOrder.getCreatedAt());
      orderDetailDTO.setProducts(products);
      orderDetailDTO.setTotalAmount(totalQuantity);
      orderDetailDTO.setTotalPrice(totalPrice);
      orderDetailDTO.setStatus("PENDING");
       Map<String,Object> response = new HashMap<>();
            response.put("order", orderDetailDTO);
            response.put("status", "success");
                return ResponseEntity.ok(response);
}
    //POST
    @PostMapping("/orders")
    public ResponseEntity<?> createOrder(@RequestBody OrderDTO orderRequest) {
      Order createOrder = new Order();
      createOrder.setFullName(orderRequest.getFullName());
      createOrder.setPhoneNumber(orderRequest.getPhoneNumber());
      createOrder.setAddress(orderRequest.getAddress());
      createOrder.setEmail(orderRequest.getEmail());
      OrderStatus statusPending = OrderStatus.PENDING;;

      createOrder.setStatus("PENDING");
      createOrder.setCreatedAt(new Date());
  
   orderService.saveOrder(createOrder);
 
      for (Product product : orderRequest.getProducts()) {
          Product existProduct = productSevice.getProductById(product.getId());
          if (existProduct==null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy san pham voi id"+product.getId());
        }
        int updateQuantity = existProduct.getQuantity() - product.getQuantity();
        existProduct.setQuantity(updateQuantity);
      // existProduct.setOrder(createOrder);
      // productSevice.saveProduct(existProduct);

        //
          OrderDetail orderDetail = new OrderDetail();
          orderDetail.setAmount(product.getQuantity());
          orderDetail.setPrice(product.getQuantity()*product.getPrice());
          orderDetail.setProduct(existProduct);
          orderDetail.setOrder(createOrder);
          orderDetailService.saveOrderDetail(orderDetail);

      }
       Map<String,Object> response = new HashMap<>();
            response.put("order", createOrder);
            response.put("status", "success");
                return ResponseEntity.ok(response);

       
    }
}
