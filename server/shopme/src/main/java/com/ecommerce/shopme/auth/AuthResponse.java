package com.ecommerce.shopme.auth;

import lombok.Data;

@Data
public class AuthResponse {
    //  private String email;
    private String fullName;
    private String email;
 
    public AuthResponse() { }

    public AuthResponse(String fullName, String email) {
      this.fullName = fullName;
      this.email = email;
    }
   
}
