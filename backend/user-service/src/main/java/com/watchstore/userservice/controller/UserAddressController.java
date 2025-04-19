package com.watchstore.userservice.controller;

import com.watchstore.userservice.dto.UserAddressDto;
import com.watchstore.userservice.dto.UserDto;
import com.watchstore.userservice.service.UserAddressService;
import com.watchstore.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/addresses")
@CrossOrigin(origins = {"http://localhost:3000"})
public class UserAddressController {

    @Autowired
    private UserAddressService addressService;

    @Autowired
    private UserService userService;

    // CREATE - Thêm địa chỉ mới
    @PostMapping
    public ResponseEntity<?> addAddress(@RequestBody UserAddressDto addressDto, Authentication authentication) {
        try {
            if (authentication == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "Không được xác thực"));
            }

            String username = authentication.getName();
            UserDto currentUser = userService.getUserByUsername(username);

            // Đảm bảo địa chỉ được thêm cho người dùng hiện tại
            addressDto.setUserId(currentUser.getId());

            UserAddressDto savedAddress = addressService.addAddress(addressDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedAddress);
        } catch (Exception e) {
            System.err.println("Lỗi thêm địa chỉ: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    // READ - Lấy tất cả địa chỉ của người dùng
    @GetMapping("/user")
    public ResponseEntity<?> getAddressesByUser(Authentication authentication) {
        try {
            if (authentication == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "Không được xác thực"));
            }

            String username = authentication.getName();
            UserDto currentUser = userService.getUserByUsername(username);

            List<UserAddressDto> addresses = addressService.getAddressesByUserId(currentUser.getId());
            return ResponseEntity.ok(addresses);
        } catch (Exception e) {
            System.err.println("Lỗi lấy địa chỉ: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    // READ - Lấy địa chỉ theo ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getAddressById(@PathVariable Integer id, Authentication authentication) {
        try {
            if (authentication == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "Không được xác thực"));
            }

            String username = authentication.getName();
            UserDto currentUser = userService.getUserByUsername(username);

            UserAddressDto address = addressService.getAddressById(id);

            // Kiểm tra quyền: chỉ ADMIN hoặc chủ sở hữu địa chỉ mới truy cập được
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

            if (!isAdmin && !address.getUserId().equals(currentUser.getId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("message", "Không đủ quyền để truy cập"));
            }

            return ResponseEntity.ok(address);
        } catch (Exception e) {
            System.err.println("Lỗi lấy địa chỉ: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    // UPDATE - Cập nhật địa chỉ
    @PutMapping("/{id}")
    public ResponseEntity<?> updateAddress(@PathVariable Integer id,
                                           @RequestBody UserAddressDto addressDto,
                                           Authentication authentication) {
        try {
            if (authentication == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "Không được xác thực"));
            }

            String username = authentication.getName();
            UserDto currentUser = userService.getUserByUsername(username);

            UserAddressDto existingAddress = addressService.getAddressById(id);

            // Kiểm tra quyền: chỉ ADMIN hoặc chủ sở hữu địa chỉ mới cập nhật được
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

            if (!isAdmin && !existingAddress.getUserId().equals(currentUser.getId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("message", "Không đủ quyền để cập nhật"));
            }

            // Đảm bảo không thay đổi userId
            addressDto.setUserId(existingAddress.getUserId());
            addressDto.setId(id);

            UserAddressDto updatedAddress = addressService.updateAddress(addressDto);
            return ResponseEntity.ok(updatedAddress);
        } catch (Exception e) {
            System.err.println("Lỗi cập nhật địa chỉ: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    // DELETE - Xóa địa chỉ
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAddress(@PathVariable Integer id, Authentication authentication) {
        try {
            if (authentication == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "Không được xác thực"));
            }

            String username = authentication.getName();
            UserDto currentUser = userService.getUserByUsername(username);

            UserAddressDto existingAddress = addressService.getAddressById(id);

            // Kiểm tra quyền: chỉ ADMIN hoặc chủ sở hữu địa chỉ mới xóa được
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

            if (!isAdmin && !existingAddress.getUserId().equals(currentUser.getId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("message", "Không đủ quyền để xóa"));
            }

            addressService.deleteAddress(id);
            return ResponseEntity.ok(Map.of("message", "Địa chỉ đã được xóa thành công"));
        } catch (Exception e) {
            System.err.println("Lỗi xóa địa chỉ: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    // UPDATE - Đặt địa chỉ làm mặc định
    @PatchMapping("/{id}/default")
    public ResponseEntity<?> setDefaultAddress(@PathVariable Integer id, Authentication authentication) {
        try {
            if (authentication == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "Không được xác thực"));
            }

            String username = authentication.getName();
            UserDto currentUser = userService.getUserByUsername(username);

            UserAddressDto existingAddress = addressService.getAddressById(id);

            // Kiểm tra quyền: chỉ chủ sở hữu địa chỉ mới đặt được mặc định
            if (!existingAddress.getUserId().equals(currentUser.getId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("message", "Không đủ quyền để thay đổi"));
            }

            addressService.setDefaultAddress(id, currentUser.getId());
            return ResponseEntity.ok(Map.of("message", "Đã đặt địa chỉ mặc định thành công"));
        } catch (Exception e) {
            System.err.println("Lỗi đặt địa chỉ mặc định: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }
}