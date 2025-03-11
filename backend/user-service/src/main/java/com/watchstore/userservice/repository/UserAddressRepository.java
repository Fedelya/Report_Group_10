package com.watchstore.userservice.repository;

import com.watchstore.userservice.model.UserAddress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAddressRepository extends JpaRepository<UserAddress, Integer> {
}