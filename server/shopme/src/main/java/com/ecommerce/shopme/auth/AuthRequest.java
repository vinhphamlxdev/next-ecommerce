package com.ecommerce.shopme.auth;

import java.util.Optional;

import org.hibernate.validator.constraints.Length;
import org.springframework.beans.factory.annotation.Autowired;

import com.ecommerce.shopme.entity.User;
import com.ecommerce.shopme.repository.UserRepository;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.*;
 
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthRequest {
    
    private String fullName;
    @NotNull
    @Email
    @Length(min = 5, max = 50, message = "Địa chỉ email tối thiểu 5 kí tự tối đa là 50 kí tự")
    private String email;
    @NotNull @Length(min = 5, max = 30, message = "Mật khẩu tối thiểu 5 kí tự và tối đa 30 kí tự")
    private String password;
    
public boolean isEmailUnique(UserRepository userRepository) {
        Optional<User> existingUser = userRepository.findByEmail(email);
        return existingUser == null;
    }
}