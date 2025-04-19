package com.watchstore.userservice.dto;

import lombok.Data;

@Data
public class UserUpdateDto {
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String role;
    private Boolean isActive;
}