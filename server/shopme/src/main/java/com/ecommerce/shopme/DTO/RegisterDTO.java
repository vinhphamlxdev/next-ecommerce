package com.ecommerce.shopme.dto;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDTO {
    
    private String username;
    @NotNull @Email @Length(min = 5, max = 50, message = "Địa chỉ email tối thiểu 5 kí tự tối đa là 50 kí tự")
    private String email;
    @NotNull @Length(min = 5, max = 30, message = "Mật khẩu tối thiểu 5 kí tự và tối đa 30 kí tự")
    private String password;
}
