package com.ecommerce.shopme.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ecommerce.shopme.DTO.UserDTO;
import com.ecommerce.shopme.User.User;

@Service
public interface UserService {
  
    //get all user
    public Page<User> listAllUser(Pageable pageable);
        
    
    //get user by id
    public User getUserById(int id);
    

     //delete user
     public void delete(Integer id);
     //registeruser
     void registerUser(UserDTO user);
}
