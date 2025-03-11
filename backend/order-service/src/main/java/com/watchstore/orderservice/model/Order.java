package com.watchstore.orderservice.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "orders")
@Data
public class Order {
    @Id
    private String id;
    private String customer;
    private double total;
    private String status;
    private String shippingAddress;
    private List<Product> products;
}