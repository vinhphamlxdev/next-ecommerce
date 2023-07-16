package com.ecommerce.shopme.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.shopme.entity.Role;
import com.ecommerce.shopme.repository.RoleRepository;

@Service
public class RoleService {
    @Autowired
    RoleRepository roleRepository;
    public Optional<Role> getRoleByName(String name){
            return roleRepository.findByName(name);
    }
}
