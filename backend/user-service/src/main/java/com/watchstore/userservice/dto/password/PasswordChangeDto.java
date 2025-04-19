package com.watchstore.userservice.dto.password;

import lombok.Data;

@Data
public class PasswordChangeDto {
    private String currentPassword;
    private String newPassword;
}