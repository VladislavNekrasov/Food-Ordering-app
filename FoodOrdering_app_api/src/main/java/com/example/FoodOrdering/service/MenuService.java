package com.example.FoodOrdering.service;

import com.example.FoodOrdering.model.Menu;
import com.example.FoodOrdering.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MenuService {
    private final MenuRepository menuRepository;

    @Autowired
    public MenuService(MenuRepository menuRepository) {
        this.menuRepository = menuRepository;
    }

    public Menu createMenu(Menu menu) {
        return menuRepository.save(menu);
    }

    public void deleteMenu(Long id) {
        menuRepository.deleteById(id);
    }

    public List<Menu> getAllMenus() {
        return menuRepository.findAll();
    }

    public Optional<Menu> getByIdMenu(Long id) {
        return menuRepository.findById(id);
    }

    public Menu updateMenu(Long id, Menu menu) {
        Menu existingMenu = menuRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Menu not found"));

        existingMenu.setTitle(menu.getTitle());
        existingMenu.setMeals(menu.getMeals());

        return menuRepository.save(existingMenu);
    }
}
