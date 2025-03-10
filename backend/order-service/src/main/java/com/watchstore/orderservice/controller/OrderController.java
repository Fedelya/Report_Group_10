package com.watchstore.orderservice.controller;

import com.watchstore.orderservice.model.Order;
import com.watchstore.orderservice.model.Product;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    private List<Order> orders = new ArrayList<>();

    public OrderController() {
        List<Product> products1 = new ArrayList<>();
        products1.add(new Product("Watch 1", 1, 50.0));
        products1.add(new Product("Watch 2", 2, 25.0));
        orders.add(new Order("001", "Nguyen A", 100.0, "Pending", "123 Street, Hanoi", products1)); // Sửa ID thành "001"

        List<Product> products2 = new ArrayList<>();
        products2.add(new Product("Watch 3", 1, 200.0));
        orders.add(new Order("002", "Tran B", 200.0, "Processing", "456 Street, HCMC", products2));

        List<Product> products3 = new ArrayList<>();
        products3.add(new Product("Watch 4", 1, 150.0));
        orders.add(new Order("003", "Le C", 150.0, "Delivered", "789 Street, Da Nang", products3));
    }

    @GetMapping
    public List<Order> getOrders() {
        return orders;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable String id) {
        Order order = orders.stream()
                .filter(o -> o.getId().equals(id)) // So sánh trực tiếp với id
                .findFirst()
                .orElse(null);
        if (order == null) {
            return ResponseEntity.status(404).body(null);
        }
        return ResponseEntity.ok(order);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable String id, @RequestBody Order orderUpdate) {
        for (Order order : orders) {
            if (order.getId().equals(id)) {
                order.setStatus(orderUpdate.getStatus());
                return ResponseEntity.ok(order);
            }
        }
        return ResponseEntity.status(404).body(null);
    }
}