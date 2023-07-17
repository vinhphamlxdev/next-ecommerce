package com.ecommerce.shopme.dto;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.ecommerce.shopme.entity.Role;

import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
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
        
  @Temporal(TemporalType.TIMESTAMP)
  private Date createdAt;
    private Set<Role> roles = new HashSet<>();
    
}
