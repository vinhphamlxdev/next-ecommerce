package com.ecommerce.shopme.security;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
//bật thuộc tính jsr250Enabled để sử dụng chú thích @RolesAllowed trong mã API  để ủy quyền cấp phương thức
@Configuration
@AllArgsConstructor
@EnableGlobalMethodSecurity(
    prePostEnabled = false, securedEnabled = false, jsr250Enabled = true
)
public class SecurityConfig  {
    private UserDetailsService userDetailsService;
    


    @Bean
    public static PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf().disable()
            .authorizeHttpRequests()
            .requestMatchers("products", "products/*","categorys","categorys/*")
            .permitAll()
            .requestMatchers("/api/v1/management/**").hasAnyRole("ADMIN", "MANAGER")
            .anyRequest()
          .authenticated();
              
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}


