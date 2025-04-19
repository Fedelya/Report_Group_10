package com.watchstore.userservice.service;

import com.watchstore.userservice.dto.UserAddressDto;
import com.watchstore.userservice.exception.ResourceNotFoundException;
import com.watchstore.userservice.model.User;
import com.watchstore.userservice.model.UserAddress;
import com.watchstore.userservice.repository.UserAddressRepository;
import com.watchstore.userservice.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserAddressService {

    @Autowired
    private UserAddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    // Thêm địa chỉ mới
    public UserAddressDto addAddress(UserAddressDto addressDto) {
        User user = userRepository.findById(addressDto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng với ID: " + addressDto.getUserId()));

        UserAddress address = modelMapper.map(addressDto, UserAddress.class);
        address.setUser(user);

        // Nếu địa chỉ đầu tiên của người dùng, đặt làm mặc định
        boolean isFirstAddress = addressRepository.countByUserId(addressDto.getUserId()) == 0;
        address.setIsDefault(addressDto.getIsDefault() != null ? addressDto.getIsDefault() : isFirstAddress);

        UserAddress savedAddress = addressRepository.save(address);
        return modelMapper.map(savedAddress, UserAddressDto.class);
    }

    // Lấy tất cả địa chỉ của người dùng
    public List<UserAddressDto> getAddressesByUserId(Integer userId) {
        // Kiểm tra người dùng tồn tại
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("Không tìm thấy người dùng với ID: " + userId);
        }

        List<UserAddress> addresses = addressRepository.findByUserId(userId);
        return addresses.stream()
                .map(address -> modelMapper.map(address, UserAddressDto.class))
                .collect(Collectors.toList());
    }

    // Lấy địa chỉ theo ID
    public UserAddressDto getAddressById(Integer id) {
        UserAddress address = addressRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy địa chỉ với ID: " + id));

        return modelMapper.map(address, UserAddressDto.class);
    }

    // Cập nhật địa chỉ
    public UserAddressDto updateAddress(UserAddressDto addressDto) {
        // Kiểm tra địa chỉ tồn tại
        UserAddress existingAddress = addressRepository.findById(addressDto.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy địa chỉ với ID: " + addressDto.getId()));

        // Kiểm tra người dùng tồn tại
        User user = userRepository.findById(addressDto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy người dùng với ID: " + addressDto.getUserId()));

        // Cập nhật thông tin địa chỉ
        if (addressDto.getAddressLine1() != null) {
            existingAddress.setAddressLine1(addressDto.getAddressLine1());
        }

        if (addressDto.getAddressLine2() != null) {
            existingAddress.setAddressLine2(addressDto.getAddressLine2());
        }

        if (addressDto.getCity() != null) {
            existingAddress.setCity(addressDto.getCity());
        }

        if (addressDto.getState() != null) {
            existingAddress.setState(addressDto.getState());
        }

        if (addressDto.getPostalCode() != null) {
            existingAddress.setPostalCode(addressDto.getPostalCode());
        }

        if (addressDto.getCountry() != null) {
            existingAddress.setCountry(addressDto.getCountry());
        }

        // Nếu đặt địa chỉ này làm mặc định
        if (addressDto.getIsDefault() != null && addressDto.getIsDefault()) {
            // Reset tất cả các địa chỉ khác của người dùng
            addressRepository.resetDefaultAddresses(user.getId());
            existingAddress.setIsDefault(true);
        }

        UserAddress updatedAddress = addressRepository.save(existingAddress);
        return modelMapper.map(updatedAddress, UserAddressDto.class);
    }

    // Xóa địa chỉ
    public void deleteAddress(Integer id) {
        // Kiểm tra địa chỉ tồn tại
        if (!addressRepository.existsById(id)) {
            throw new ResourceNotFoundException("Không tìm thấy địa chỉ với ID: " + id);
        }

        addressRepository.deleteById(id);
    }

    // Đặt địa chỉ làm mặc định
    @Transactional
    public void setDefaultAddress(Integer addressId, Integer userId) {
        // Kiểm tra địa chỉ tồn tại
        UserAddress address = addressRepository.findById(addressId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy địa chỉ với ID: " + addressId));

        // Kiểm tra địa chỉ thuộc về người dùng
        if (!address.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("Địa chỉ không thuộc về người dùng này");
        }

        // Reset tất cả các địa chỉ khác của người dùng
        addressRepository.resetDefaultAddresses(userId);

        // Đặt địa chỉ này làm mặc định
        address.setIsDefault(true);
        addressRepository.save(address);
    }
}