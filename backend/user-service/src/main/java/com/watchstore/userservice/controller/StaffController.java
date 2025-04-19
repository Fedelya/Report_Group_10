package com.watchstore.userservice.controller;

import com.watchstore.userservice.dto.UserDto;
import com.watchstore.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/staff")
@CrossOrigin(origins = {"http://localhost:3000"})
public class StaffController {

    @Autowired
    private UserService userService;

    // API dành riêng cho STAFF và ADMIN
    @GetMapping("/users")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_STAFF')")
    public ResponseEntity<?> listUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        try {
            Page<UserDto> users = userService.getAllUsers(PageRequest.of(page, size));
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/dashboard-stats")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_STAFF')")
    public ResponseEntity<?> getDashboardStats() {
        try {
            long totalUsers = userService.countTotalUsers();
            long activeUsers = userService.countActiveUsers();
            // Các thống kê khác có thể thêm vào

            Map<String, Object> stats = Map.of(
                    "totalUsers", totalUsers,
                    "activeUsers", activeUsers
            );

            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}