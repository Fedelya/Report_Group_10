package com.watchstore.userservice.dto.password;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class ForgotPasswordDto {
    private String email;
}