package com.watchstore.userservice.service;

import com.watchstore.userservice.dto.*;
import com.watchstore.userservice.dto.password.PasswordChangeDto;
import com.watchstore.userservice.exception.ResourceNotFoundException;
import com.watchstore.userservice.model.*;
import com.watchstore.userservice.repository.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Service
public class UserService {
    @Autowired private UserRepository userRepository;
    @Autowired private PasswordResetTokenRepository tokenRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private ModelMapper modelMapper;
    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    // Phương thức kiểm tra username tồn tại hay chưa
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    // Phương thức kiểm tra email tồn tại hay chưa
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public UserDto registerUser(UserDto userDto) {
        System.out.println("Mapped userDto: " + userDto.toString());

        if (userRepository.findByUsername(userDto.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }

        if (userDto.getPassword() == null || userDto.getPassword().trim().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }
        if (userRepository.existsByEmail(userDto.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPasswordHash(passwordEncoder.encode(userDto.getPassword()));
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setRole(userDto.getRole());
        user.setIsActive(userDto.getIsActive());
        user.setCreatedAt(new Date().toInstant());
        user.setUpdatedAt(new Date().toInstant());
        user.setPhone(userDto.getPhone());

        User savedUser = userRepository.save(user);

        return modelMapper.map(savedUser, UserDto.class);
    }

    public UserDto getUserByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
        return modelMapper.map(user, UserDto.class);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElse(null);
    }

    public Page<UserDto> getAllUsers(Pageable pageable) {
        Page<User> users = userRepository.findAll(pageable);
        return users.map(user -> modelMapper.map(user, UserDto.class));
    }

    public UserDto getUserById(Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng có ID: " + id));
        return modelMapper.map(user, UserDto.class);
    }

    public UserDto updateUser(Integer id, UserUpdateDto userUpdateDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng có ID: " + id));

        if (userUpdateDto.getFirstName() != null) {
            user.setFirstName(userUpdateDto.getFirstName());
        }

        if (userUpdateDto.getLastName() != null) {
            user.setLastName(userUpdateDto.getLastName());
        }

        if (userUpdateDto.getEmail() != null && !user.getEmail().equals(userUpdateDto.getEmail())) {
            // Kiểm tra email mới không trùng với email của người dùng khác
            if (userRepository.existsByEmailAndIdNot(userUpdateDto.getEmail(), id)) {
                throw new IllegalArgumentException("Email đã được sử dụng bởi người dùng khác");
            }
            user.setEmail(userUpdateDto.getEmail());
        }

        if (userUpdateDto.getPhone() != null) {
            user.setPhone(userUpdateDto.getPhone());
        }

        if (userUpdateDto.getRole() != null) {
            user.setRole(userUpdateDto.getRole());
        }

        if (userUpdateDto.getIsActive() != null) {
            user.setIsActive(userUpdateDto.getIsActive());
        }

        user.setUpdatedAt(Instant.now());
        User savedUser = userRepository.save(user);
        return modelMapper.map(savedUser, UserDto.class);
    }

    public UserDto updateUserStatus(Integer id, boolean active) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng có ID: " + id));

        user.setIsActive(active);
        user.setUpdatedAt(Instant.now());
        User savedUser = userRepository.save(user);
        return modelMapper.map(savedUser, UserDto.class);
    }

    public void deleteUser(Integer id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("Không tìm thấy người dùng có ID: " + id);
        }
        userRepository.deleteById(id);
    }

    public void changePassword(String username, PasswordChangeDto passwordChangeDto) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy người dùng: " + username));

        if (!passwordEncoder.matches(passwordChangeDto.getCurrentPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Mật khẩu hiện tại không đúng");
        }

        if (passwordChangeDto.getNewPassword() == null || passwordChangeDto.getNewPassword().trim().isEmpty()) {
            throw new IllegalArgumentException("Mật khẩu mới không được để trống");
        }

        user.setPasswordHash(passwordEncoder.encode(passwordChangeDto.getNewPassword()));
        user.setUpdatedAt(Instant.now());
        userRepository.save(user);
    }

    public void resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Token không hợp lệ"));

        // Kiểm tra token còn hiệu lực không
        if (resetToken.getExpiresAt().isBefore(Instant.now())) {
            throw new IllegalArgumentException("Token đã hết hạn");
        }

        // Lấy thông tin user và cập nhật mật khẩu
        User user = resetToken.getUser();
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        user.setUpdatedAt(Instant.now());
        userRepository.save(user);

        // Xóa token đã sử dụng
        tokenRepository.delete(resetToken);
    }

    @Transactional
    public void createPasswordResetToken(User user, String token) {
        // Xóa token cũ nếu có
        try {
            passwordResetTokenRepository.deleteByUserId(user.getId());
        } catch (Exception e) {
            System.err.println("Error deleting old tokens: " + e.getMessage());
            // Continue with the process
        }

        // Tạo token mới
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpiresAt(Instant.now().plusSeconds(PasswordResetToken.EXPIRATION));

        System.out.println("Creating token: " + token);
        System.out.println("For user: " + user.getUsername());
        System.out.println("Expires at: " + resetToken.getExpiresAt());

        passwordResetTokenRepository.save(resetToken);
    }

    // Kiểm tra token đặt lại mật khẩu còn hợp lệ không
    public boolean validatePasswordResetToken(String token) {
        PasswordResetToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Token không hợp lệ"));

        return !resetToken.getExpiresAt().isBefore(Instant.now());
    }
}