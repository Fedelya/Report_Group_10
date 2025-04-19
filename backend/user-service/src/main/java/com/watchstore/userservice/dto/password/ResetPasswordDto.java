package com.watchstore.userservice.dto.password;

import lombok.Data;

@Data
public class ResetPasswordDto {
    private String token;
    private String newPassword;
}