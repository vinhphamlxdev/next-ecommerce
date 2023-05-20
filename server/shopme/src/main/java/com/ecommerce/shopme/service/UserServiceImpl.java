package com.ecommerce.shopme.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecommerce.shopme.DTO.UserDTO;
import com.ecommerce.shopme.User.User;
import com.ecommerce.shopme.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
    @Override
    public void delete(Integer id) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public User getUserById(int id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Page<User> listAllUser(Pageable pageable) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public void registerUser(UserDTO user) {
        // TODO Auto-generated method stub
        
    }

    @Autowired
    private UserRepository userRepository;

    
}
