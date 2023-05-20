package com.ecommerce.shopme.User;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.*;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User  {

  @Id
  @GeneratedValue
  private Integer id;
  private String fullname;
  private String email;
  private String password;
  private boolean enabled;

  @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  @JoinTable(
          name = "users_roles",
          joinColumns = @JoinColumn(name = "user_id"),
          inverseJoinColumns = @JoinColumn(name = "role_id")
          )
  private Set<Role> roles = new HashSet<>();

  // @Override
  // public Collection<? extends GrantedAuthority> getAuthorities() {
  //   // TODO Auto-generated method stub
  //   return null;
  // }

  // @Override
  // public String getUsername() {
  //   // TODO Auto-generated method stub
  //   return null;
  // }

  // @Override
  // public boolean isAccountNonExpired() {
  //   // TODO Auto-generated method stub
  //   return false;
  // }

  // @Override
  // public boolean isAccountNonLocked() {
  //   // TODO Auto-generated method stub
  //   return false;
  // }

  // @Override
  // public boolean isCredentialsNonExpired() {
  //   // TODO Auto-generated method stub
  //   return false;
  // }



}