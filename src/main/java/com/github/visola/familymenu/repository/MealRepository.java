package com.github.visola.familymenu.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.github.visola.familymenu.model.Meal;

public interface MealRepository extends PagingAndSortingRepository<Meal, Integer> {

	Page<Meal> findByFamilyNameOrderByPosition(Pageable request, String familyName);

}
