package com.watchstore.userservice.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        // Optional: Configure ModelMapper if needed
        modelMapper.getConfiguration()
                .setSkipNullEnabled(true); // Skip null fields during mapping
        return modelMapper;
    }
}