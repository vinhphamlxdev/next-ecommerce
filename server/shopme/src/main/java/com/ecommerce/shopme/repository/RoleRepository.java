package com.ecommerce.shopme.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ecommerce.shopme.User.Role;

public interface RoleRepository  extends JpaRepository<Role,Integer>{
   Optional<Role> findByName(String name);
}
