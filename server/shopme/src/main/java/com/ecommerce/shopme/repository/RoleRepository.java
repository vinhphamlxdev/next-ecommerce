package com.ecommerce.shopme.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.shopme.User.Role;

public interface RoleRepository  extends JpaRepository<Role,Integer>{
    
}
