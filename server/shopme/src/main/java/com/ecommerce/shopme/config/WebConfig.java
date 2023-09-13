package com.ecommerce.shopme.config;
// package com.ecommerce.shopme.config;

// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.servlet.config.annotation.CorsRegistry;
// import org.springframework.web.servlet.config.annotation.EnableWebMvc;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// @Configuration
// @EnableWebMvc
// public class WebConfig implements WebMvcConfigurer {


//       //cho phép danh sách các tiêu đề, "Content-Type" và "Authorization": 
//         //Đây là hai tiêu đề HTTP cụ thể được liệt kê trong phần  allowedHeaders. 
//         //Trong trường hợp này, cho phép hai tiêu đề này trong yêu cầu CORS.
//         //"Content-Type": Được sử dụng để chỉ định kiểu nội dung của yêu cầu (ví dụ: application/json, application/x-www-form-urlencoded,...). Đây là tiêu đề quan trọng khi  gửi dữ liệu thông qua phương thức POST hoặc PUT.
//         //"Authorization": Được sử dụng để chứa thông tin xác thực như mã token hoặc thông tin xác thực dựa trên chứng chỉ. Nếu ứng dụng của bạn yêu cầu xác thực người dùng, thông tin này sẽ được đính kèm trong tiêu đề Authorization để truyền tải thông tin xác thực đến backend.
//     @Override
//     public void addCorsMappings(CorsRegistry registry) {
//         registry.addMapping("/**")
//         .allowedOrigins("http://localhost:4000")
//         .allowedMethods("GET", "POST", "PUT", "DELETE")
//         .allowedHeaders("Content-Type", "Authorization");
//     }
// }