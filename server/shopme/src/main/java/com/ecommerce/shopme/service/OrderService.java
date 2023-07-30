package com.ecommerce.shopme.service;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ecommerce.shopme.dto.OrderDTO;
import com.ecommerce.shopme.dto.OrderDetailDTO;
import com.ecommerce.shopme.entity.Color;
import com.ecommerce.shopme.entity.Order;
import com.ecommerce.shopme.entity.OrderDetail;
import com.ecommerce.shopme.entity.Product;
import com.ecommerce.shopme.entity.Size;
import com.ecommerce.shopme.exception.OrderNotFoundException;
import com.ecommerce.shopme.repository.ColorRepository;
import com.ecommerce.shopme.repository.OrderDetailRepository;
import com.ecommerce.shopme.repository.OrderRepository;
import com.ecommerce.shopme.repository.ProductRepository;
import com.ecommerce.shopme.repository.SizeRepository;
import com.ecommerce.shopme.request.OrderRequest;

@Service
public class OrderService {
   @Autowired
   private OrderRepository orderRepository;
   @Autowired 
   ProductRepository productRepository;
   @Autowired 
   ColorRepository colorRepository;
   @Autowired
   SizeRepository sizeRepository;
   @Autowired 
   OrderDetailRepository orderDetailRepository;
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

   
public void placeOrder(OrderDTO orderRequest){
  Order newOrder = new Order();
   newOrder.setCreatedAt(new Date());
   newOrder.setFullName(orderRequest.getFullName());
   newOrder.setEmail(orderRequest.getEmail());
   newOrder.setAddress(orderRequest.getAddress()); 
   newOrder.setPhoneNumber(orderRequest.getPhoneNumber());

   newOrder.setStatus("PENDING");
   orderRepository.save(newOrder);
   List<OrderDetailDTO> itemRequests = orderRequest.getOrderDetails();

   for (OrderDetailDTO itemRequest : itemRequests) {
      Optional<Product> product = productRepository.findById(itemRequest.getProductId());
      Optional<Color> color = colorRepository.findById(itemRequest.getColorId());
      Optional<Size> size = sizeRepository.findById(itemRequest.getSizeId());


      OrderDetail orderDetail = new OrderDetail();
      orderDetail.setProduct(product.get());
      orderDetail.setColor(color.get());
      orderDetail.setSize(size.get());
      int updateQuantity = product.get().getQuantity() - itemRequest.getQuantity();
      product.get().setQuantity(updateQuantity);
      orderDetail.setAmount(itemRequest.getQuantity());
     orderDetail.setPrice(product.get().getPrice());
      orderDetail.setTotalPrice(itemRequest.getQuantity()*product.get().getPrice());
      orderDetail.setOrder(newOrder);
      orderDetailRepository.save(orderDetail);

   }

  

}
// public Order getOrderById(Integer id) {
        
//    return orderRepository.findById(id).get();
   
// }
// //get order by id
public Order getOrderById(Integer id) {
        
   return orderRepository.findById(id).get();
   
}

}
