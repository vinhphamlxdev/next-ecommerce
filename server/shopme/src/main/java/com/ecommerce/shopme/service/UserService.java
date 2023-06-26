package com.ecommerce.shopme.service;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecommerce.shopme.repository.RoleRepository;
import com.ecommerce.shopme.repository.UserRepository;
import com.ecommerce.shopme.user.Role;
import com.ecommerce.shopme.user.User;


@Service
public class UserService   {
    @Autowired
    private UserRepository userRepository;



}
