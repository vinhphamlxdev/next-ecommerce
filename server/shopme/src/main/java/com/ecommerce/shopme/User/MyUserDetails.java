package com.ecommerce.shopme.User;
import java.util.*;
 
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
 
public class MyUserDetails implements UserDetails {
 
    private User user;
     
    public MyUserDetails(User user) {
        this.user = user;
    }
 //Một GrantedAuthority đại diện cho một quyền hoặc vai trò cụ thể mà 
 //người dùng có thể có trong hệ thống. Ví dụ, quyền "ROLE_ADMIN" hoặc "ROLE_USER"
 //Phương thức này trả về một tập hợp các vai trò (quyền hạn) sẽ được Spring Security sử dụng trong quy trình ủy quyền. 
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<Role> roles = user.getRoles();
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
         
        for (Role role : roles) {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        }
         
        return authorities;
    }
 
    @Override
    public String getPassword() {
        return user.getPassword();
    }
 
    @Override
    public String getUsername() {
        return user.getEmail();
    }
 
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
 
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
 
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
 
    @Override
    public boolean isEnabled() {
        return user.isEnabled();
    }
 
}
