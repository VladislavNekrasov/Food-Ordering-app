package com.example.FoodOrdering.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;

import java.util.Objects;

@Entity
@Table(name = "meal")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Meal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    @ManyToOne
    @JoinColumn(name = "menu_id")
    @JsonIgnore

    private Menu menu;
    @ManyToOne
    @JoinColumn(name = "order_id")
    @JsonIgnore
    private Order order;



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Meal meal = (Meal) o;
        return id != null && Objects.equals(id, meal.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}