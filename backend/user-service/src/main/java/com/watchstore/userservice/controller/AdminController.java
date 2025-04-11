package com.watchstore.userservice.controller;

import com.watchstore.userservice.dto.*;
import com.watchstore.userservice.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/users")
public class UserController {

    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
        UserDto createdUser = userService.registerUser(userDto);
        return ResponseEntity.ok(createdUser);
    }
}
