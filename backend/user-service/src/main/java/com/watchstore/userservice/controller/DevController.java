package com.watchstore.userservice.controller;

import com.watchstore.userservice.dto.UserDto;
import com.watchstore.userservice.model.Role;
import com.watchstore.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/dev")
@CrossOrigin(origins = {"http://localhost:3000"})
@Profile("dev") // Chỉ hoạt động trong môi trường dev
public class DevController {

    @Value("${admin.setup.key}")
    private String setupKey;

    @Autowired
    private UserService userService;

    @PostMapping("/setup-admin")
    public ResponseEntity<?> setupAdmin(@RequestBody UserDto userDto, @RequestParam String key) {
        if (!setupKey.equals(key)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "Unauthorized setup attempt"));
        }

        try {
            userDto.setRole(Role.ROLE_ADMIN);
            UserDto createdAdmin = userService.registerUser(userDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdAdmin);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}