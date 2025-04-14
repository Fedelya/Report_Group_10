package com.watchstore.userservice.repository;

import com.watchstore.userservice.dto.UserDto;
import com.watchstore.userservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
    UserDto getUserByUsername(String username);
}