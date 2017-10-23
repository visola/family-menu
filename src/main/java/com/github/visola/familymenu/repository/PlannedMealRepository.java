package com.github.visola.familymenu.repository;

import java.util.Calendar;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.github.visola.familymenu.model.PlannedMeal;

public interface PlannedMealRepository extends PagingAndSortingRepository<PlannedMeal, Integer>{

    Page<PlannedMeal> findByPersonFamilyNameAndPlannedDateBetween(Pageable request, String familyName, Calendar begin, Calendar end);

}
