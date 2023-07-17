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
  private String fullName;
   @Column(nullable = false, length = 50, unique = true)
  private String email;
   @Column(nullable = false, length = 64)
  private String password;
  private boolean enabled;
  
    
  @Temporal(TemporalType.TIMESTAMP)
  private Date createdAt;

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



  public User(String fullName, String email, String password) {
    this.fullName = fullName;
    this.email = email;
    this.password = password;
  }



  public Integer getId() {
    return id;
  }
  

  public void setId(Integer id) {
    this.id = id;
  }

  public String getFullName() {
    return fullName;
  }

  public void setFullName(String fullName) {
    this.fullName = fullName;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public boolean isEnabled() {
    return enabled;
  }

  public void setEnabled(boolean enabled) {
    this.enabled = enabled;
  }



  public Date getCreatedAt() {
    return createdAt;
  }



  public void setCreatedAt(Date createdAt) {
    this.createdAt = createdAt;
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
  public String getUsername() {
    // TODO Auto-generated method stub
    return this.email;
  }

  @Override
  public boolean isAccountNonExpired() {
    // TODO Auto-generated method stub
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    // TODO Auto-generated method stub
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    // TODO Auto-generated method stub
    return true;
  }






}