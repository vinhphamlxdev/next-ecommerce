package com.ecommerce.shopme.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;

import com.ecommerce.shopme.User.User;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
   Optional<User> findByUsername(String username);

   Boolean existsByEmail(String email);

   Optional<User> findByUsernameOrEmail(String username, String email);

   boolean existsByUsername(String username);
}