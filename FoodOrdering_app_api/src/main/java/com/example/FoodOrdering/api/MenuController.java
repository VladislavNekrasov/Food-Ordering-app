package com.example.FoodOrdering.api;

import com.example.FoodOrdering.model.Menu;
import com.example.FoodOrdering.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/FoodOrdering/menu")

public class MenuController {
    private final MenuService menuService;

    @Autowired
    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<Menu> getAll() {
        return menuService.getAllMenus();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or  hasRole('ADMIN')")
    public ResponseEntity getById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(menuService.getByIdMenu(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Something went wrong" + e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity update(@PathVariable Long id, @RequestBody Menu menu) {
        try {
            menuService.updateMenu(id, menu);
            return ResponseEntity.ok().build();

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Something went wrong" + e.getMessage());
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity create(@RequestBody Menu menu) {
        try {
            return ResponseEntity.ok(menuService.createMenu(menu));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Something went wrong" + e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity delete(@PathVariable Long id) {
        try {
            menuService.deleteMenu(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Something went wrong" + e.getMessage());
        }
    }
}
