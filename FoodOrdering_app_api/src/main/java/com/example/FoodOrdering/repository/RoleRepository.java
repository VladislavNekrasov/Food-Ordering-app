package com.example.FoodOrdering.repository;

import com.example.FoodOrdering.model.ERole;
import com.example.FoodOrdering.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
