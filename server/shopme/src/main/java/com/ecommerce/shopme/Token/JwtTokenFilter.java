package com.ecommerce.shopme.Token;

import org.springframework.security.core.userdetails.UserDetails;

import com.ecommerce.shopme.User.Role;
import com.ecommerce.shopme.User.User;

import io.jsonwebtoken.Claims;

public class JwtTokenFilter {
    private UserDetails getUserDetails(String token) {
        User userDetails = new User();
        Claims claims = jwtUtil.parseClaims(token);
        String subject = (String) claims.get(Claims.SUBJECT);
        String roles = (String) claims.get("roles");
         
        roles = roles.replace("[", "").replace("]", "");
        String[] roleNames = roles.split(",");
         
        for (String aRoleName : roleNames) {
            userDetails.addRole(new Role(aRoleName));
        }
         
        String[] jwtSubject = subject.split(",");
     
        userDetails.setId(Integer.parseInt(jwtSubject[0]));
        userDetails.setEmail(jwtSubject[1]);
     
        return userDetails;
    }
}
