package com.watchstore.userservice.controller;

import com.watchstore.userservice.config.JwtUtil;
import com.watchstore.userservice.dto.*;
import com.watchstore.userservice.dto.login.LoginRequest;
import com.watchstore.userservice.dto.login.LoginResponse;
import com.watchstore.userservice.dto.password.ForgotPasswordDto;
import com.watchstore.userservice.dto.password.PasswordChangeDto;
import com.watchstore.userservice.dto.password.ResetPasswordDto;
import com.watchstore.userservice.exception.ResourceNotFoundException;
import com.watchstore.userservice.model.PasswordResetToken;
import com.watchstore.userservice.model.User;
import com.watchstore.userservice.repository.PasswordResetTokenRepository;
import com.watchstore.userservice.repository.UserRepository;
import com.watchstore.userservice.service.*;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = {"http://localhost:3000"})
public class UserController {
    @Autowired private UserService userService;
    @Autowired private JwtUtil jwtUtil;
    @Autowired private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    // CREATE - Đăng ký người dùng mới
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDto userDto) {
        try {
            System.out.println("Đang xử lý đăng ký cho user: " + userDto.getUsername());

            // Kiểm tra username và email đã tồn tại chưa
            if (userService.existsByUsername(userDto.getUsername())) {
                return ResponseEntity.badRequest()
                        .body(Map.of("message", "Username đã tồn tại. Vui lòng chọn username khác."));
            }

            if (userService.existsByEmail(userDto.getEmail())) {
                return ResponseEntity.badRequest()
                        .body(Map.of("message", "Email đã được đăng ký. Vui lòng sử dụng email khác."));
            }

            // Đăng ký người dùng mới
            UserDto registeredUser = userService.registerUser(userDto);

            System.out.println("Đăng ký thành công cho user: " + registeredUser.getUsername());
            return ResponseEntity.status(HttpStatus.CREATED).body(registeredUser);
        } catch (Exception e) {
            System.err.println("Lỗi đăng ký: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Lỗi đăng ký: " + e.getMessage()));
        }
    }

    // CREATE - Đăng nhập
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequestDto) {
        try {
            System.out.println("Đang xử lý đăng nhập cho user: " + loginRequestDto.getUsername());

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequestDto.getUsername(),
                            loginRequestDto.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String username = authentication.getName();
            String role = authentication.getAuthorities().iterator().next().getAuthority();
            String token = jwtUtil.generateToken(username, role);

            LoginResponse response = new LoginResponse(token, username, role);

            System.out.println("Đăng nhập thành công cho user: " + username + " với role: " + role);
            return ResponseEntity.ok(response);
        } catch (AuthenticationException e) {
            System.err.println("Đăng nhập thất bại cho user: " + loginRequestDto.getUsername());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Tên đăng nhập hoặc mật khẩu không đúng"));
        } catch (Exception e) {
            System.err.println("Lỗi đăng nhập: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Lỗi đăng nhập: " + e.getMessage()));
        }
    }

    // READ - Lấy thông tin người dùng hiện tại
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        try {
            System.out.println("Đang xử lý yêu cầu '/me' - Lấy thông tin người dùng hiện tại");
            if (authentication == null) {
                System.out.println("Authentication là null - Không được xác thực");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "Không được xác thực"));
            }

            System.out.println("Authentication: " + authentication);
            System.out.println("Principal: " + authentication.getPrincipal());
            System.out.println("Name: " + authentication.getName());
            System.out.println("Authorities: " + authentication.getAuthorities());

            String username = authentication.getName();
            System.out.println("Đang tìm thông tin người dùng với username: " + username);

            UserDto userDto = userService.getUserByUsername(username);
            System.out.println("Đã tìm thấy thông tin người dùng: " + userDto);

            return ResponseEntity.ok(userDto);
        } catch (UsernameNotFoundException ex) {
            System.err.println("Không tìm thấy username: " + ex.getMessage());
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", ex.getMessage()));
        } catch (Exception e) {
            System.err.println("Lỗi không xác định khi lấy thông tin người dùng: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Lỗi lấy thông tin người dùng: " + e.getMessage()));
        }
    }

    // READ - Lấy danh sách người dùng (phân trang)
    @GetMapping
    public ResponseEntity<?> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication) {
        try {
            // Kiểm tra quyền ADMIN
            if (authentication == null || !authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("message", "Không đủ quyền để truy cập"));
            }

            Pageable pageable = PageRequest.of(page, size);
            Page<UserDto> users = userService.getAllUsers(pageable);

            return ResponseEntity.ok(users);
        } catch (Exception e) {
            System.err.println("Lỗi lấy danh sách người dùng: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Lỗi lấy danh sách người dùng: " + e.getMessage()));
        }
    }

    // READ - Lấy thông tin người dùng theo ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Integer id, Authentication authentication) {
        try {
            // Kiểm tra quyền: chỉ ADMIN hoặc chính người dùng đó mới truy cập được
            if (authentication == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "Không được xác thực"));
            }

            String username = authentication.getName();
            UserDto currentUser = userService.getUserByUsername(username);
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

            if (!isAdmin && !currentUser.getId().equals(id)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("message", "Không đủ quyền để truy cập"));
            }

            UserDto userDto = userService.getUserById(id);
            return ResponseEntity.ok(userDto);
        } catch (Exception e) {
            System.err.println("Lỗi lấy thông tin người dùng: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    // UPDATE - Cập nhật thông tin người dùng
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Integer id, @RequestBody UserUpdateDto userUpdateDto,
                                        Authentication authentication) {
        try {
            // Kiểm tra quyền: chỉ ADMIN hoặc chính người dùng đó mới cập nhật được
            if (authentication == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "Không được xác thực"));
            }

            String username = authentication.getName();
            UserDto currentUser = userService.getUserByUsername(username);
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

            if (!isAdmin && !currentUser.getId().equals(id)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("message", "Không đủ quyền để cập nhật thông tin"));
            }

            // Kiểm tra thay đổi role - chỉ ADMIN mới được phép
            if (userUpdateDto.getRole() != null && !isAdmin) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("message", "Không đủ quyền để thay đổi role"));
            }

            UserDto updatedUser = userService.updateUser(id, userUpdateDto);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            System.err.println("Lỗi cập nhật người dùng: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    // UPDATE - Thay đổi trạng thái người dùng (kích hoạt/vô hiệu hóa)
    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateUserStatus(@PathVariable Integer id, @RequestParam boolean active,
                                              Authentication authentication) {
        try {
            // Kiểm tra quyền ADMIN
            if (authentication == null || !authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("message", "Không đủ quyền để thay đổi trạng thái người dùng"));
            }

            UserDto updatedUser = userService.updateUserStatus(id, active);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            System.err.println("Lỗi cập nhật trạng thái người dùng: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    // DELETE - Xóa người dùng
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id, Authentication authentication) {
        try {
            // Kiểm tra quyền ADMIN
            if (authentication == null || !authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("message", "Không đủ quyền để xóa người dùng"));
            }

            userService.deleteUser(id);
            return ResponseEntity.ok(Map.of("message", "Người dùng đã được xóa thành công"));
        } catch (Exception e) {
            System.err.println("Lỗi xóa người dùng: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    // UPDATE - Thay đổi mật khẩu
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(Authentication authentication, @RequestBody PasswordChangeDto passwordChangeDto) {
        try {
            if (authentication == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "Không được xác thực"));
            }

            String username = authentication.getName();
            userService.changePassword(username, passwordChangeDto);
            return ResponseEntity.ok(Map.of("message", "Mật khẩu đã được thay đổi thành công"));
        } catch (Exception e) {
            System.err.println("Lỗi thay đổi mật khẩu: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    // CREATE - Yêu cầu đặt lại mật khẩu
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordDto forgotPasswordDto) {
        try {
            System.out.println("Đang xử lý yêu cầu quên mật khẩu cho email: " + forgotPasswordDto.getEmail());

            // Tìm kiếm người dùng qua email
            User user = userService.getUserByEmail(forgotPasswordDto.getEmail());

            if (user == null) {
                System.out.println("Không tìm thấy người dùng với email: " + forgotPasswordDto.getEmail());
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "Không tìm thấy tài khoản với email này"));
            }

            // Tạo token đặt lại mật khẩu
            String token = UUID.randomUUID().toString();
            userService.createPasswordResetToken(user, token);

            // TODO: Gửi email với token
            // emailService.sendPasswordResetEmail(user.getEmail(), token);

            return ResponseEntity.ok(Map.of(
                    "message", "Email đặt lại mật khẩu đã được gửi",
                    "token", token // Chỉ trả về trong môi trường dev, bỏ trong production
            ));
        } catch (Exception e) {
            System.err.println("Lỗi quên mật khẩu: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Lỗi yêu cầu đặt lại mật khẩu: " + e.getMessage()));
        }
    }

    // UPDATE - Đặt lại mật khẩu bằng token
    @Transactional
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordDto resetPasswordDto) {
        try {
            System.out.println("Processing password reset request with token: " + resetPasswordDto.getToken());

            // Validate the token
            if (!userService.validatePasswordResetToken(resetPasswordDto.getToken())) {
                return ResponseEntity.badRequest()
                        .body(Map.of("message", "Token đặt lại mật khẩu không hợp lệ hoặc đã hết hạn"));
            }

            // Reset the password
            userService.resetPassword(resetPasswordDto.getToken(), resetPasswordDto.getNewPassword());

            return ResponseEntity.ok(Map.of("message", "Mật khẩu đã được đặt lại thành công"));
        } catch (IllegalArgumentException e) {
            System.err.println("Lỗi đặt lại mật khẩu (invalid argument): " + e.getMessage());
            return ResponseEntity.badRequest()
                    .body(Map.of("message", e.getMessage()));
        } catch (ResourceNotFoundException e) {
            System.err.println("Lỗi đặt lại mật khẩu (resource not found): " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            System.err.println("Lỗi đặt lại mật khẩu: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Lỗi đặt lại mật khẩu: " + e.getMessage()));
        }
    }

    // READ - Kiểm tra tính hợp lệ của token reset password
    @Transactional(readOnly = true)
    public boolean validatePasswordResetToken(String token) {
        return passwordResetTokenRepository.findByToken(token)
                .map(resetToken -> {
                    boolean isValid = !resetToken.getExpiresAt().isBefore(Instant.now()) &&
                            !Boolean.TRUE.equals(resetToken.getIsUsed());
                    System.out.println("Token validation result: " + isValid);
                    return isValid;
                })
                .orElse(false);
    }
}