package com.github.visola.familymenu.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.github.visola.familymenu.model.Dish;
import com.github.visola.familymenu.model.Family;
import com.github.visola.familymenu.repository.DishRepository;
import com.github.visola.familymenu.repository.FamilyRepository;

@RestController
@RequestMapping("${api.base.path}/dishes")
public class DishController {

    private final DishRepository dishRepository;
    private final FamilyRepository familyRepository;

    @Autowired
    public DishController(DishRepository dishRepository, FamilyRepository familyRepository) {
        this.dishRepository = dishRepository;
        this.familyRepository = familyRepository;
    }

    @RequestMapping(method=RequestMethod.GET)
    public Page<Dish> getDishes(@RequestParam(defaultValue="0", name="page") Integer page, @AuthenticationPrincipal String familyName) {
        PageRequest request = new PageRequest(page, 100);
        return dishRepository.findByFamilyName(request, familyName);
    }

    @RequestMapping(method=RequestMethod.POST)
    public Dish createDish(@RequestBody @Valid Dish dish, @AuthenticationPrincipal String familyName) {
        Family loadedFamily = familyRepository.findByName(familyName);
        dish.setFamily(loadedFamily);
        return dishRepository.save(dish);
    }

}
