package com.ecommerce.shopme.config;

import javax.servlet.http.HttpServletResponse;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.ecommerce.shopme.Token.JwtTokenFilter;
import com.ecommerce.shopme.repository.UserRepository;

@EnableWebSecurity
@EnableGlobalMethodSecurity(
    prePostEnabled = false, securedEnabled = false, jsr250Enabled = true
)
@Configuration
public class AppSecurityConfig {
    @Autowired
    private UserRepository userRepo;
    @Autowired 
    private JwtTokenFilter jwtTokenFilter;
     @Bean
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
             
            @Override
            public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
                return userRepo.findByEmail(email)
                        .orElseThrow(
                                () -> new UsernameNotFoundException("User " + email + " not found"));
            }
        };
    }
     
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


     @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }
     @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.cors();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.authorizeHttpRequests()
               .requestMatchers("/auth/login",
               "/auth/register",
               "/products",
               "/categorys",
               "products/**",
               "orders",
               "orders/**",
               //
               "/v2/api-docs",
               "/v3/api-docs",
               "/v3/api-docs/**",
               "/swagger-resources",
               "/swagger-resources/**",
                "/configuration/ui",
                "/configuration/security",
                "/swagger-ui/**",
               "/swagger-ui.html")
               .permitAll()
                .anyRequest().authenticated();
            http.exceptionHandling()
                    .authenticationEntryPoint(
                        (request, response, ex) -> {
                            response.sendError(
                                HttpServletResponse.SC_UNAUTHORIZED,
                                ex.getMessage()
                            );
                        }
                );
         
        http.addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }  

    
}
