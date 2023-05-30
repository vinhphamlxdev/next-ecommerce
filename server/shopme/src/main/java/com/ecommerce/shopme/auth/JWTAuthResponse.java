package com.ecommerce.shopme.auth;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class JWTAuthResponse {
    private String username;
    private String accessToken;
    public JWTAuthResponse(String username, String accessToken) {
        this.username = username;
        this.accessToken = accessToken;
    }

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getAccessToken() {
        return accessToken;
    }
    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
    
}
