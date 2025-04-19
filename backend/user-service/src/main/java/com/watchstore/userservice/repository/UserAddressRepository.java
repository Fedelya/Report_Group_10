package com.watchstore.userservice.repository;

import com.watchstore.userservice.model.UserAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserAddressRepository extends JpaRepository<UserAddress, Integer> {

    List<UserAddress> findByUserId(Integer userId);

    @Query("SELECT COUNT(a) FROM UserAddress a WHERE a.user.id = :userId")
    int countByUserId(@Param("userId") Integer userId);

    @Modifying
    @Query("UPDATE UserAddress a SET a.isDefault = false WHERE a.user.id = :userId")
    void resetDefaultAddresses(@Param("userId") Integer userId);

    @Query("SELECT a FROM UserAddress a WHERE a.user.id = :userId AND a.isDefault = true")
    UserAddress findDefaultAddressByUserId(@Param("userId") Integer userId);
}