package com.watchstore.userservice.controller;

import com.watchstore.userservice.dto.UserDto;
import com.watchstore.userservice.dto.UserUpdateDto;
import com.watchstore.userservice.model.Role;
import com.watchstore.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/admin/users")
@CrossOrigin(origins = {"http://localhost:3000"})
public class UserAdminController {

    @Autowired
    private UserService userService;

    @PostMapping("/create-admin")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> createAdmin(@RequestBody UserDto userDto, Authentication authentication) {
        try {
            UserDto createdUser = userService.createUserWithRole(userDto, Role.ROLE_ADMIN);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/create-staff")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> createStaff(@RequestBody UserDto userDto, Authentication authentication) {
        try {
            UserDto createdUser = userService.createUserWithRole(userDto, Role.ROLE_STAFF);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PatchMapping("/{id}/promote-to-staff")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> promoteToStaff(@PathVariable Integer id) {
        try {
            // Tạo UserUpdateDto từ UserDto
            UserUpdateDto updateDto = new UserUpdateDto();
            updateDto.setRole(Role.ROLE_STAFF);

            UserDto updatedUser = userService.updateUser(id, updateDto);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PatchMapping("/{id}/promote-to-admin")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> promoteToAdmin(@PathVariable Integer id) {
        try {
            // Tạo UserUpdateDto từ UserDto
            UserUpdateDto updateDto = new UserUpdateDto();
            updateDto.setRole(Role.ROLE_ADMIN);

            UserDto updatedUser = userService.updateUser(id, updateDto);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PatchMapping("/{id}/demote-to-staff")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> demoteToStaff(@PathVariable Integer id) {
        try {
            // Tạo UserUpdateDto từ UserDto
            UserUpdateDto updateDto = new UserUpdateDto();
            updateDto.setRole(Role.ROLE_STAFF);

            UserDto updatedUser = userService.updateUser(id, updateDto);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PatchMapping("/{id}/demote-to-user")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> demoteToUser(@PathVariable Integer id) {
        try {
            // Tạo UserUpdateDto từ UserDto
            UserUpdateDto updateDto = new UserUpdateDto();
            updateDto.setRole(Role.ROLE_USER);

            UserDto updatedUser = userService.updateUser(id, updateDto);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}