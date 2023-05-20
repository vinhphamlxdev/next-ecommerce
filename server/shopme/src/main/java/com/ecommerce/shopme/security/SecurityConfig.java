package com.ecommerce.shopme.security;

import org.springframework.context.annotation.*;
import org.springframework.security.authentication.dao.*;
import org.springframework.security.config.annotation.authentication.builders.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.*;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.ecommerce.shopme.User.UserDetailsServiceImpl;


@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    // @Bean
    // public UserDetailsService userDetailsService() {
    //     return new UserDetailsServiceImpl();
    // }
     
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
     
    // @Bean
    // public DaoAuthenticationProvider authenticationProvider() {
    //     DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
    //     authProvider.setUserDetailsService(userDetailsService());
    //     authProvider.setPasswordEncoder(passwordEncoder());
         
    //     return authProvider;
    // }
 
    // @Override
    // protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    //     auth.authenticationProvider(authenticationProvider());
    // }
 

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
            http.csrf().disable()
            .authorizeHttpRequests()
            .requestMatchers("/home")
            .permitAll()
            .and()
            .formLogin();
            return http.build();

    }
}
