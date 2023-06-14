package com.example.FoodOrdering.service;

import com.example.FoodOrdering.model.Meal;
import com.example.FoodOrdering.model.Menu;
import com.example.FoodOrdering.repository.MealRepository;
import com.example.FoodOrdering.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class MealService {
    private final MealRepository mealRepository;
    private final MenuRepository menuRepository;

    @Autowired
    public MealService(MealRepository mealRepository, MenuRepository menuRepository) {
        this.mealRepository = mealRepository;
        this.menuRepository = menuRepository;
    }

    public Meal createMeal(Meal meal, Long menuId) {
        Menu menu = menuRepository.findById(menuId)
                .orElseThrow(() -> new IllegalArgumentException("Menu not found"));

        meal.setMenu(menu);
        return mealRepository.save(meal);
    }

    public void removeMeal(Long mealId, Long menuId) {
        Meal meal = mealRepository.findById(mealId).orElseThrow(() -> new IllegalArgumentException("Meal not found"));
        Menu menu = menuRepository.findById(menuId).orElseThrow(() -> new IllegalArgumentException("Menu not found"));

        menu.getMeals().remove(meal);
        mealRepository.deleteById(mealId);
    }
    public List<Meal> getMeals(Long menuId){
        Menu menu = menuRepository.findById(menuId).orElseThrow(() -> new NoSuchElementException("Menu not found with ID: " + menuId));
        return menu.getMeals();
    }

    public Meal updateMeal(Long mealId, Long menuId, Meal meal){
        Meal meal1 = mealRepository.findById(mealId).orElseThrow(() -> new IllegalArgumentException("Meal not found"));
        Menu menu = menuRepository.findById(menuId).orElseThrow(() -> new IllegalArgumentException("Menu not found"));

        meal1.setTitle(meal.getTitle());
        meal1.setDescription(meal.getDescription());
        meal1.setQuantity(meal.getQuantity());

        menu.getMeals().add(meal1);
        menuRepository.save(menu);

        return meal1;

    }
    public Meal getOneMeal(Long mealId){
        return mealRepository.findById(mealId).orElseThrow(() -> new IllegalArgumentException("Meal not found"));
    }
}
