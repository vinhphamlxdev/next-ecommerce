package com.ecommerce.shopme.auth;

 
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.ecommerce.shopme.Token.JwtTokenUtil;
import com.ecommerce.shopme.dto.UserDTO;
import com.ecommerce.shopme.entity.Role;
import com.ecommerce.shopme.entity.User;
import com.ecommerce.shopme.service.UserService;

import jakarta.validation.Valid;




//Spring Security Authentication Filters là những filter sẽ nằm giữa client request với server.
// Khi nhận được request, các filter sẽ tách lọc những thông tin từ request thành các authentication details (username, password, roles,…). 
//Default Spring Security sẽ sử dụng class UsernamePasswordAuthenticationFilter.
 //UsernamePasswordAuthenticationToken gồm 3 tham số
 //Tên người dùng (username): Tham số đầu tiên là tên người dùng của người dùng cần xác thực.
//Mật khẩu (password): Tham số thứ hai là mật khẩu của người dùng.
//Danh sách các quyền (authorities): Tham số thứ ba là một danh sách các quyền hoặc
// vai trò mà người dùng được phân quyền. Đây có thể là một danh sách các đối tượng GrantedAuthority.
@CrossOrigin(origins = "http://localhost:4000", maxAge = -1)
@RestController
@Validated
public class AuthApi {
        @Autowired
        UserService userService;
    @Autowired
     AuthenticationManager authManager;
    @Autowired
     JwtTokenUtil jwtUtil;
   


    @PostMapping("/auth/register")
        public ResponseEntity<?> register(@RequestBody @Valid AuthRequest request) {
                Optional<User> existUser = userService.getUserByEmail(request.getEmail());
                if (existUser.isPresent()){
                 return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email da ton tai");
                }
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String password = passwordEncoder.encode(request.getPassword().toString());
        User createdUser = new User(request.getFullName(), request.getEmail(), password);
        createdUser.setEnabled(true);
                createdUser.addRole(new Role(2, "ROLE_CUSTOMER"));

        userService.saveUser(createdUser);
        UserDTO userDTO = new UserDTO();
                userDTO.setId(createdUser.getId());
                userDTO.setFullName(createdUser.getFullName());
                userDTO.setEmail(createdUser.getEmail());
                userDTO.setEnabled(createdUser.isEnabled());
                userDTO.setRoles(createdUser.getRoles());
          return ResponseEntity.ok().body(userDTO);
      
    }
    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthRequest request) {
        
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(), request.getPassword())
            );
        System.out.println(authentication);
        System.out.println(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(), request.getPassword())
            );
           authentication.getPrincipal(); //trả lại email user
            User user = (User) authentication.getPrincipal();
            String accessToken = jwtUtil.generateAccessToken(user);
            AuthResponse response = new AuthResponse(user.getEmail(), accessToken);
            return ResponseEntity.ok().body(response);
      
    }
}
