package com.ecommerce.shopme.dto;

import java.util.HashSet;
import java.util.Set;

import com.ecommerce.shopme.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Integer id;
    private String fullName;
    private String email;
    private boolean enabled;
    private Set<Role> roles = new HashSet<>();
    
}
