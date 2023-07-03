package com.ecommerce.shopme.entity;
import jakarta.persistence.*;

import java.util.*;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.*;

@NoArgsConstructor
@Entity
@Table(name = "users")
public class User implements UserDetails {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

   @Column(nullable = false)
  private String username;
   @Column(nullable = false, length = 50, unique = true)
  private String email;
   @Column(nullable = false, length = 64)
  private String password;
  private boolean enabled;


  //inverseJoinColumns định nghĩa cách ánh xạ các cột khóa ngoại trong bảng trung gian để 
  //thiết lập quan hệ nhiều-nhiều giữa "Role" và "User". Cột khóa ngoại user_id trong bảng
  // trung gian sẽ tham chiếu đến bảng "users", trong khi cột khóa ngoại role_id sẽ tham chiếu đến bảng "roles".
  @ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(
			name = "users_roles",
			joinColumns = @JoinColumn(name = "user_id"),
			inverseJoinColumns = @JoinColumn(name = "role_id")
			)
	private Set<Role> roles = new HashSet<>();

 public User(String email, String password,String username) {
        this.email = email;
        this.password = password;
        this.username = username;
    }
     
  //dụng để trả về một danh sách các quyền (authorities) mà người dùng có.
  // Mỗi quyền được đại diện bởi một đối tượng GrantedAuthority.
  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    List<SimpleGrantedAuthority> authorities = new ArrayList<>();
    for (Role role : roles) {
      authorities.add(new SimpleGrantedAuthority(role.getName()));
    }
    return authorities;
  }
  
  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public void setEnabled(boolean enabled) {
    this.enabled = enabled;
  }

  public Set<Role> getRoles() {
    return roles;
  }

  public void setRoles(Set<Role> roles) {
    this.roles = roles;
  }
 public void addRole(Role role) {
        this.roles.add(role);
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
  public String getPassword() {
    return password;
  }
  @Override
  public String getUsername() {
    return this.username;
  }
  @Override
  public boolean isEnabled() {
    return enabled;
  }





}