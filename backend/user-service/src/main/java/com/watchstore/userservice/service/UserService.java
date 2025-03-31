package com.watchstore.userservice.service;

import com.watchstore.userservice.dto.*;
import com.watchstore.userservice.exception.ResourceNotFoundException;
import com.watchstore.userservice.model.*;
import com.watchstore.userservice.repository.*;
import com.watchstore.userservice.repository.PasswordResetTokenRepository;
import com.watchstore.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;

import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Service
public class UserService {
    @Autowired private UserRepository userRepository;
    @Autowired private PasswordResetTokenRepository tokenRepository;
    @Autowired private PasswordEncoder passwordEncoder;
//    @Autowired private EmailService emailService;
    @Autowired private ModelMapper modelMapper;

    public UserDto registerUser(UserDto userDto) {
        // In chi tiết đối tượng userDto
        System.out.println("Mapped userDto: " + userDto.toString());

        // Kiểm tra username đã tồn tại chưa
        if (userRepository.findByUsername(userDto.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }

        // Kiểm tra password chi tiết hơn
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
}