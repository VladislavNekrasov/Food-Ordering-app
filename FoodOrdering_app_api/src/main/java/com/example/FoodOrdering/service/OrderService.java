package com.example.FoodOrdering.service;

import com.example.FoodOrdering.exception.MealNotFoundException;
import com.example.FoodOrdering.exception.OrderNotFoundException;
import com.example.FoodOrdering.model.Meal;
import com.example.FoodOrdering.model.Order;
import com.example.FoodOrdering.repository.MealRepository;
import com.example.FoodOrdering.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final MealRepository mealRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, MealRepository mealRepository) {
        this.orderRepository = orderRepository;
        this.mealRepository = mealRepository;
    }

    public Order getOrderById(Long id) throws OrderNotFoundException {
        return orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException("Order not found with id: " + id));
    }

    public List<Order> getAllOrders(){
        return orderRepository.findAll();
    }

    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    public Order confirmOrder(Long id) throws OrderNotFoundException {
        Order order = getOrderById(id);
        order.setConfirmed(true);
        return orderRepository.save(order);
    }

    public void cancelOrder(Long id) throws OrderNotFoundException {
        Order order = getOrderById(id);
        orderRepository.delete(order);
    }

    public void addMealToOrder(Long orderId, Long mealId) throws OrderNotFoundException, MealNotFoundException {
        Order order = getOrderById(orderId);
        Meal meal = mealRepository.findById(mealId)
                .orElseThrow(() -> new MealNotFoundException("Meal not found with id: " + mealId));

        order.getMeals().add(meal);
        meal.setOrder(order);

        orderRepository.save(order);
    }

    public void removeMealFromOrder(Long orderId, Long mealId) throws OrderNotFoundException, MealNotFoundException {
        Order order = getOrderById(orderId);
        Meal meal = mealRepository.findById(mealId)
                .orElseThrow(() -> new MealNotFoundException("Meal not found with id: " + mealId));

        order.getMeals().remove(meal);
        meal.setOrder(null);

        orderRepository.save(order);
    }
}



