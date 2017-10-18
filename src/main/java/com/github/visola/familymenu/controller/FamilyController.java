package com.github.visola.familymenu.controller;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.github.visola.familymenu.controller.exception.BadRequestException;
import com.github.visola.familymenu.model.Family;
import com.github.visola.familymenu.model.Meal;
import com.github.visola.familymenu.repository.FamilyRepository;
import com.github.visola.familymenu.repository.MealRepository;

@RestController
@RequestMapping("${api.base.path}/families")
public class FamilyController {

    private final FamilyRepository familyRepository;
    private final MealRepository mealRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public FamilyController(FamilyRepository familyRepository, MealRepository mealRepository, PasswordEncoder passwordEncoder) {
        this.familyRepository = familyRepository;
        this.mealRepository = mealRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @RequestMapping(method = RequestMethod.POST)
    @Transactional
    public Family createFamily(@RequestBody @Valid Family family) {
        if (family.getId() == null) {
            Family loaded = familyRepository.findByName(family.getName());
            if (loaded != null) {
                throw new BadRequestException("Family name already taken.");
            }

            family.setPassword(passwordEncoder.encode(family.getPassword()));
            Family savedFamily = familyRepository.save(family);
            
            addMealsForFamily(savedFamily);
            return savedFamily;
        }
        throw new BadRequestException("Not suppose to update family throw this endpoint.");
    }

	private void addMealsForFamily(Family savedFamily) {
		mealRepository.save(new Meal("Lunch", 1, savedFamily));
		mealRepository.save(new Meal("Dinner", 2, savedFamily));
	}

}
