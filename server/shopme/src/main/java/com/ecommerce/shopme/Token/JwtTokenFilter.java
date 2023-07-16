package com.ecommerce.shopme.Token;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ecommerce.shopme.entity.Role;
import com.ecommerce.shopme.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.io.IOException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtTokenFilter  extends OncePerRequestFilter {
     @Autowired
    private JwtTokenUtil jwtUtil;
 
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException, java.io.IOException {
 
        if (!hasAuthorizationBearer(request)) {
            filterChain.doFilter(request, response);
            return;
        }
 
        String token = getAccessToken(request);
 
        if (!jwtUtil.validateAccessToken(token)) {
            filterChain.doFilter(request, response);
            return;
        }
 
        setAuthenticationContext(token, request);
        filterChain.doFilter(request, response);
    }
 
    private boolean hasAuthorizationBearer(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (ObjectUtils.isEmpty(header) || !header.startsWith("Bearer")) {
            return false;
        }
 
        return true;
    }
 
    private String getAccessToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        String token = header.split(" ")[1].trim();
        return token;
    }
 
private void setAuthenticationContext(String token, HttpServletRequest request) {
    UserDetails userDetails = getUserDetails(token);
 
    UsernamePasswordAuthenticationToken
        authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
 
    authentication.setDetails(
            new WebAuthenticationDetailsSource().buildDetails(request));
 
    SecurityContextHolder.getContext().setAuthentication(authentication);
}
 //Trich xuat thong tin user dua vao token
    private UserDetails getUserDetails(String token) {
        User userDetails = new User();
    Claims claims = jwtUtil.parseClaims(token);
    String subject = (String) claims.get(Claims.SUBJECT);
    String roles = (String) claims.get("roles");
    System.out.println("claims role:"+roles);
    //roles:"[ROLE_ADMIN,ROLE_CUSTOMER,ROLE_EDITOR]"--->roles:"ROLE_ADMIN,ROLE_CUSTOMER,ROLE_EDITOR"
    roles = roles.replace("[", "").replace("]", "");
    String[] roleNames = roles.split(",");
    //roles:"ROLE_ADMIN,ROLE_CUSTOMER,ROLE_EDITOR"--->roles:[ROLE_ADMIN,ROLE_CUSTOMER,ROLE_EDITOR]
    for (String aRoleName : roleNames) {
        userDetails.addRole(new Role(aRoleName));
    }
     
    String[] jwtSubject = subject.split(",");
 
    userDetails.setId(Integer.parseInt(jwtSubject[0]));
    userDetails.setEmail(jwtSubject[1]);
    return userDetails;
    }
}
