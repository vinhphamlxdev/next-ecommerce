package com.ecommerce.shopme.service;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecommerce.shopme.entity.Order;
import com.ecommerce.shopme.entity.Product;
import com.ecommerce.shopme.entity.User;
import com.ecommerce.shopme.repository.RoleRepository;
import com.ecommerce.shopme.repository.UserRepository;

import jakarta.transaction.Transactional;


@Service
@Transactional
public class UserService   {
    @Autowired
    private UserRepository userRepository;
  @Autowired PasswordEncoder passwordEncoder;

    //get all
   public Page<User> listAllUser(Pageable pageable){
    if (pageable.isPaged()) {
        return userRepository.findAll(pageable);
    } else {
        List<User> allUsers = userRepository.findAll(Pageable.unpaged()).getContent();
        return new PageImpl<>(allUsers);
    }
   }
 //save product
    public User saveUser(User user){
       return userRepository.save(user);
    }
      //get user by id
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
public boolean isPasswordCorrect(Optional<User> existUser,String rawPassword){
  return passwordEncoder.matches(rawPassword, existUser.get().getPassword());
}
}
