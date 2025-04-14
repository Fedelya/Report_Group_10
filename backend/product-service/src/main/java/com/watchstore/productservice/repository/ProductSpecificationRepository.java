package com.watchstore.productservice.repository;

import com.watchstore.productservice.model.ProductSpecification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductSpecificationRepository extends JpaRepository<ProductSpecification, Integer> {
}