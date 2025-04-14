package com.watchstore.productservice.repository;

import com.watchstore.productservice.model.ProductReview;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductReviewRepository extends JpaRepository<ProductReview, Integer> {
}