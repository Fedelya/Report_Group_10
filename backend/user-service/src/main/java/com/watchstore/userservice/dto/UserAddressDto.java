package com.watchstore.userservice.dto;

import lombok.Data;

@Data
public class UserAddressDto {
    private Integer id;
    private Integer userId;
    private String addressLine1;
    private String addressLine2;
    private String city;
    private String state;
    private String postalCode;
    private String country;
    private Boolean isDefault;
}