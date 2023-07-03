package com.ecommerce.shopme.service;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

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

 //save product
    public User saveUser(User user){
       return userRepository.save(user);
    }
      //get user by id
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

}
