package com.ecommerce.shopme.controller;

import java.util.ArrayList;
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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.shopme.dto.OrderDetailDTO;
import com.ecommerce.shopme.dto.PageResponse;
import com.ecommerce.shopme.dto.UserDTO;
import com.ecommerce.shopme.entity.Order;
import com.ecommerce.shopme.entity.OrderDetail;
import com.ecommerce.shopme.entity.Product;
import com.ecommerce.shopme.entity.Role;
import com.ecommerce.shopme.entity.User;
import com.ecommerce.shopme.service.UserService;

@CrossOrigin(origins = "http://localhost:4000", maxAge = -1,allowedHeaders = "*")
@RestController
public class UserController {
    @Autowired
    UserService userService;
    @GetMapping("/users")
public ResponseEntity<?> getAllOrder(@RequestParam(defaultValue = "0") int pageNum,
@RequestParam(defaultValue = "5") int itemPerPage){
        Pageable pageable = PageRequest.of(pageNum, itemPerPage);
        Page<User> users = userService.listAllUser(pageable);
          // Tạo danh sách OrderResponse từ danh sách order
          List<UserDTO> userDTOs = users.stream()
          .map(user -> {
            UserDTO userDTO = new UserDTO();
            userDTO.setId(user.getId());
            userDTO.setFullName(user.getFullName());
            userDTO.setEmail(user.getEmail());
            userDTO.setCreatedAt(user.getCreatedAt());
            Set<Role> roles = new HashSet<>();
            for (Role role : user.getRoles()) {
                roles.add(role);
            }
            userDTO.setRoles(roles);

            return userDTO;
          })
          .collect(Collectors.toList());
          Map<String,Object> usersResponse = new HashMap<>();
          usersResponse.put("status", "success");
          usersResponse.put("users", userDTOs);
          PageResponse paggination = new PageResponse<>();
          paggination.setCurrent(users.getNumber());
          paggination.setItemsPerPage(users.getSize());
          paggination.setTotalItems(users.getTotalElements());
          paggination.setTotalPages(users.getTotalPages());
          usersResponse.put("page", paggination);
             return ResponseEntity.ok(usersResponse);

}


}
