package com.example.FoodOrdering.repositoryTest;

import com.example.FoodOrdering.model.Meal;
import com.example.FoodOrdering.model.Menu;
import com.example.FoodOrdering.model.Order;
import com.example.FoodOrdering.repository.MenuRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;

@SpringBootTest
@DataJpaTest
public class MenuRepositoryTest {
    @Autowired
    private MenuRepository menuRepository;

    @Test
    public void saveMenu() {
        Menu menu = new Menu(1L,"Drinks menu", Arrays.asList(new Meal(1L,"","",2,new Menu(), new Order())));
        menuRepository.save(menu);
    }
}
