// package com.ecommerce.shopme.service;

// import lombok.AllArgsConstructor;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.GrantedAuthority;
// import org.springframework.security.core.authority.SimpleGrantedAuthority;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.stereotype.Service;

// import com.ecommerce.shopme.entity.User;
// import com.ecommerce.shopme.repository.UserRepository;

// import java.util.Set;
// import java.util.stream.Collectors;

// @Service
// @AllArgsConstructor
// public class CustomUserDetailsService implements UserDetailsService {

//     // private UserRepository userRepository;
//     @Autowired
//     UserRepository userRepository;


//     @Override
//     public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {

//         User user = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail)
//                 .orElseThrow(() -> new UsernameNotFoundException("User not exists by Username or Email"));

//         Set<GrantedAuthority> authorities = user.getRoles().stream()
//                 .map((role) -> new SimpleGrantedAuthority(role.getName()))
//                 .collect(Collectors.toSet());

//         return new org.springframework.security.core.userdetails.User(
//                 usernameOrEmail,
//                 user.getPassword(),
//                 authorities
//         );
//     }
// }