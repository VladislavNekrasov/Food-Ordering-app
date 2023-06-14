package com.example.FoodOrdering.api;

import com.example.FoodOrdering.model.Meal;
import com.example.FoodOrdering.service.MealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/FoodOrdering/meal")
public class MealController {
    private final MealService mealService;

    @Autowired
    public MealController(MealService mealService) {
        this.mealService = mealService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Meal> create(@RequestBody Meal meal, @RequestParam Long menuId) {
        mealService.createMeal(meal, menuId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete/{menuId}/{mealId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Meal> delete(@PathVariable Long menuId, @PathVariable Long mealId) {
        mealService.removeMeal(mealId, menuId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/all/{menuId}")
    @PreAuthorize("hasRole('USER') or  hasRole('ADMIN')")
    public List<Meal> getAll(@PathVariable Long menuId) {
        return mealService.getMeals(menuId);
    }

    @PutMapping("/update/{menuId}/{mealId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Meal> updateMeal(@PathVariable Long menuId, @PathVariable Long mealId, @RequestBody Meal meal) {
        mealService.updateMeal(mealId, menuId, meal);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{mealId}")
    @PreAuthorize("hasRole('USER') or  hasRole('ADMIN')")
    public Meal getOneMeal(@PathVariable Long mealId) {
        return mealService.getOneMeal(mealId);
    }

}
