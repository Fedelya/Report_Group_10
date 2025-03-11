package com.watchstore.orderservice.controller;

import com.watchstore.orderservice.model.Order;
import com.watchstore.orderservice.model.OrderItem;
import com.watchstore.orderservice.repository.OrderRepository;
import com.watchstore.orderservice.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private RestTemplate restTemplate;

    public static class OrderDTO {
        private String id;
        private String customer;
        private Double total;
        private String status;
        private List<OrderItem> products;
        private String email;
        private String shippingAddress;
        private Integer shippingFee;

        // Getters và Setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getCustomer() { return customer; }
        public void setCustomer(String customer) { this.customer = customer; }
        public Double getTotal() { return total; }
        public void setTotal(Double total) { this.total = total; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public List<OrderItem> getProducts() { return products; }
        public void setProducts(List<OrderItem> products) { this.products = products; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getShippingAddress() { return shippingAddress; }
        public void setShippingAddress(String shippingAddress) { this.shippingAddress = shippingAddress; }
        public Integer getShippingFee() { return shippingFee; }
        public void setShippingFee(Integer shippingFee) { this.shippingFee = shippingFee; }
    }

    public static class UserDTO {
        private String name;
        private String email;

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
    }

    @GetMapping
    public ResponseEntity<Page<OrderDTO>> getOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Order> orders = orderRepository.findAll(pageable);
        Page<OrderDTO> orderDTOPage = orders.map(this::mapToDTO);
        return ResponseEntity.ok(orderDTOPage);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable String id) {
        return orderRepository.findById(id)
                .map(order -> ResponseEntity.ok(mapToDTO(order)))
                .orElseGet(() -> ResponseEntity.status(404).body(null));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<OrderDTO> updateOrderStatus(@PathVariable String id, @RequestBody Order orderUpdate) {
        return orderRepository.findById(id)
                .map(order -> {
                    order.setStatus(orderUpdate.getStatus());
                    Order savedOrder = orderRepository.save(order);
                    return ResponseEntity.ok(mapToDTO(savedOrder));
                })
                .orElseGet(() -> ResponseEntity.status(404).body(null));
    }

    private OrderDTO mapToDTO(Order order) {
        OrderDTO dto = new OrderDTO();
        dto.setId(order.getId());
        dto.setTotal(order.getTotalAmount());
        dto.setStatus(order.getStatus());
        dto.setShippingAddress(order.getShippingAddress());
        dto.setShippingFee(order.getShippingFee());

        // Gọi user-service để lấy customer và email
        UserDTO user = restTemplate.getForObject(
                "http://localhost:8081/users/{id}",
                UserDTO.class,
                order.getUserId()
        );
        if (user != null) {
            dto.setCustomer(user.getName());
            dto.setEmail(user.getEmail());
        }

        // Lấy danh sách OrderItem
        List<OrderItem> items = orderItemRepository.findByOrderId(order.getId());
        dto.setProducts(items);

        return dto;
    }
}