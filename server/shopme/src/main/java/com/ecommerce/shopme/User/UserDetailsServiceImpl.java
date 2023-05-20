package com.ecommerce.shopme.User;

import org.springframework.security.core.userdetails.*;

import com.ecommerce.shopme.repository.UserRepository;

public class UserDetailsServiceImpl implements UserDetailsService {
    private UserRepository userRepository;
//lớp này sử dụng một thể hiện của giao diện Kho lưu trữ người dùng trong phương thức 
//loadUserByUsername() sẽ được gọi bởi Spring Security khi xác thực người dùng.
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        //có nghĩa là lấy đối tượng User từ userRepository dựa trên tên người dùng (email).
       User user = userRepository.getUserByEmail(email);
       if (user==null) {
        //tim trong csdl neu khong tim thay user voi ten email tuong ung
        throw new UsernameNotFoundException("Khong tim thay user voi email"+email);
       }
        return new MyUserDetails(user);
    }
    
}
