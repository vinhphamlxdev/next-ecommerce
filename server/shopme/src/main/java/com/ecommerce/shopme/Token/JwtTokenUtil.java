package com.ecommerce.shopme.Token;

import java.util.Date;

import com.ecommerce.shopme.User.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JwtTokenUtil {
    private static final String SECRET_KEY = "792442264528482B4D6251655468576D5A7134743777217A25432A462D4A404E";
    private static final long EXPIRE_DURATION = 30 * 24 * 60 * 60 * 1000L;//30 ngày
    public String generateAccessToken(User user) {
     
        return Jwts.builder()
                .setSubject(String.format("%s,%s", user.getId(), user.getEmail()))
                .setIssuer("vinhfrontend")
                .claim("roles", user.getRoles().toString())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRE_DURATION))
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
    }
}
