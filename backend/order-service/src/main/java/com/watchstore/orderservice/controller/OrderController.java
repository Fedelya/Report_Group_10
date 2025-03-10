package com.watchstore.orderservice.controller;

import com.watchstore.orderservice.model.Order;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:3000") // Cho phép CORS từ frontend
public class OrderController {

    @GetMapping
    public List<Order> getOrders() {
        List<Order> orders = new ArrayList<>();
        orders.add(new Order("#001", "Nguyen A", 100.0, "Pending"));
        orders.add(new Order("#002", "Tran B", 200.0, "Processing"));
        orders.add(new Order("#003", "Le C", 150.0, "Delivered"));
        return orders;
    }

    @PatchMapping("/{id}")
    public Order updateOrderStatus(@PathVariable String id, @RequestBody Order orderUpdate) {
        // Giả lập cập nhật trạng thái (trong thực tế, bạn sẽ truy cập database)
        for (Order order : getOrders()) {
            if (order.getId().equals(id)) {
                order.setStatus(orderUpdate.getStatus());
                return order;
            }
        }
        return null; // Hoặc ném exception nếu không tìm thấy
    }
}