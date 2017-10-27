package com.github.visola.familymenu.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.github.visola.familymenu.model.Dish;

public interface DishRepository extends PagingAndSortingRepository<Dish, Integer> {

    Page<Dish> findByFamilyName(Pageable request, String familyName);

}
