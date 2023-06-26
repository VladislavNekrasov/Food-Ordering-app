package com.example.FoodOrdering.api;

import com.example.FoodOrdering.exception.MealNotFoundException;
import com.example.FoodOrdering.exception.OrderNotFoundException;
import com.example.FoodOrdering.model.Order;
import com.example.FoodOrdering.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/FoodOrdering/orders")
public class OrderController {
    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/{orderId}")
    @PreAuthorize("hasRole('USER') or  hasRole('ADMIN')")
    public ResponseEntity<Order> getOrderById(@PathVariable Long orderId) {
        try {
            Order order = orderService.getOrderById(orderId);
            return ResponseEntity.ok(order);
        } catch (OrderNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('USER') or  hasRole('ADMIN')")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    @PostMapping
    @PreAuthorize("hasRole('USER') or  hasRole('ADMIN')")
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        Order createdOrder = orderService.createOrder(order);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
    }

    @PutMapping("/confirm/{orderId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Order> confirmOrder(@PathVariable Long orderId){
        try{
            Order order = orderService.confirmOrder(orderId);
            return ResponseEntity.ok(order);
        } catch (OrderNotFoundException e){
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/delete/{orderId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Order> cancelOrder(@PathVariable Long orderId){
        try{
            orderService.cancelOrder(orderId);
            return ResponseEntity.ok().build();
        } catch (OrderNotFoundException e){
            return ResponseEntity.notFound().build();
        }

    }
}