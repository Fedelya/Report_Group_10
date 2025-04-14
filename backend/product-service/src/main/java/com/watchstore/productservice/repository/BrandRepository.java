package com.watchstore.productservice.repository;

import com.watchstore.productservice.model.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BrandRepository extends JpaRepository<Brand, Integer> {
}