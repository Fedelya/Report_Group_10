// src/main/java/com/watchstore/orderservice/model/Order.java
package com.watchstore.orderservice.model;

import java.util.List;

public class Order {
    private String id;
    private String customer;
    private double total;
    private String status;
    private String shippingAddress;
    private List<Product> products;

    // Constructors
    public Order() {}

    public Order(String id, String customer, double total, String status, String shippingAddress, List<Product> products) {
        this.id = id;
        this.customer = customer;
        this.total = total;
        this.status = status;
        this.shippingAddress = shippingAddress;
        this.products = products;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}