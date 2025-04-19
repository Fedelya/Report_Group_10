package com.watchstore.userservice.dto;

import com.watchstore.userservice.model.Role;
import lombok.Data;

@Data
public class UserUpdateDto {
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private Role role;
    private Boolean isActive;
}