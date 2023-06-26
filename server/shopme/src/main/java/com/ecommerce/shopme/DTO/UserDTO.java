package com.ecommerce.shopme.dto;

public class UserDTO {
    private Integer id;
    private String fullName;
    private String email;
    private String password;
    private String passwordConfirm;
    public UserDTO(Integer id, String fullName, String email, String password, String passwordConfirm) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.passwordConfirm = passwordConfirm;
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
    public String getPasswordConfirm() {
        return passwordConfirm;
    }
    public void setPasswordConfirm(String passwordConfirm) {
        this.passwordConfirm = passwordConfirm;
    }
    
}
