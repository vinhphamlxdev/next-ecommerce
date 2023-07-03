package com.ecommerce.shopme.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import com.ecommerce.shopme.entity.Product;
import com.ecommerce.shopme.entity.User;

import java.util.Optional;

@Repository
public interface UserRepository extends PagingAndSortingRepository<User,Integer> {
  User save(User user);
   Optional<User> findById(Integer id);
   Optional<User> findByUsername(String username);
 Optional<User> findByEmail(String email);
   Boolean existsByEmail(String email);
   Optional<User> findByUsernameOrEmail(String username, String email);
   boolean existsByUsername(String username);
    
}
