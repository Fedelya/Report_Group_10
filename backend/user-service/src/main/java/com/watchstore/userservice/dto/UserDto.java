package com.watchstore.userservice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.watchstore.userservice.model.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {
    private Integer id;
    private String username;
    private String email;
    private String phone;
    private String firstName;
    private String lastName;
    private Role role = Role.ROLE_USER;
    private Boolean isActive;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;


    @Override
    public String toString() {
        return "UserDto{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", role='" + role + '\'' +
                ", isActive=" + isActive +
                '}';
    }
}