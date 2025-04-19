package com.watchstore.userservice.repository;

import com.watchstore.userservice.dto.UserDto;
import com.watchstore.userservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByEmailAndIdNot(String email, Integer id);
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
    long countByIsActiveTrue();
}