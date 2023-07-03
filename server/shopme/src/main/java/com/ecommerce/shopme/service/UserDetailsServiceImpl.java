package com.ecommerce.shopme.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.ecommerce.shopme.entity.User;
import com.ecommerce.shopme.repository.UserRepository;

// public class UserDetailsServiceImpl implements UserDetailsService{
// @Autowired
// UserRepository userRepository;
//     @Override
//     public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        UserDetails user = userRepository.findByUsername(username);
//         if (user == null) {
//             throw new UsernameNotFoundException("Could not find user :((");
//         }
//         return user;
//     }
    
// }
