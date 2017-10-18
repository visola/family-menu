package com.github.visola.familymenu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.github.visola.familymenu.model.Meal;
import com.github.visola.familymenu.repository.MealRepository;

@RestController
@RequestMapping("${api.base.path}/meals")
public class MealController {
	
	private final MealRepository mealRepository;
	
	@Autowired
	public MealController(MealRepository mealRepository) {
		this.mealRepository = mealRepository;
	}
	
	@RequestMapping(method = RequestMethod.GET)
    public Page<Meal> getPeople(@RequestParam(defaultValue="0", name="page") Integer page, @AuthenticationPrincipal String familyName) {
        PageRequest request = new PageRequest(page, 25);
        return mealRepository.findByFamilyNameOrderByPosition(request, familyName);
    }

}
