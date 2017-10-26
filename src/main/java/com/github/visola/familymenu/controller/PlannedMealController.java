package com.github.visola.familymenu.controller;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Objects;

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

import com.github.visola.familymenu.controller.exception.NotAuthorizedException;
import com.github.visola.familymenu.model.Dish;
import com.github.visola.familymenu.model.Family;
import com.github.visola.familymenu.model.Meal;
import com.github.visola.familymenu.model.Person;
import com.github.visola.familymenu.model.PlannedMeal;
import com.github.visola.familymenu.repository.DishRepository;
import com.github.visola.familymenu.repository.FamilyRepository;
import com.github.visola.familymenu.repository.MealRepository;
import com.github.visola.familymenu.repository.PersonRepository;
import com.github.visola.familymenu.repository.PlannedMealRepository;

@RequestMapping("${api.base.path}/plannedMeals")
@RestController
public class PlannedMealController {

    private final DishRepository dishRespository;
    private final FamilyRepository familyRepository;
    private final MealRepository mealRepository;
    private final PersonRepository personRepository;
    private final PlannedMealRepository plannedMealRepository;

    @Autowired
    public PlannedMealController(
            DishRepository dishRepository,
            FamilyRepository familyRepository,
            MealRepository mealRepository,
            PersonRepository personRepository,
            PlannedMealRepository plannedMealRepository) {
        this.dishRespository = dishRepository;
        this.familyRepository = familyRepository;
        this.mealRepository = mealRepository;
        this.personRepository = personRepository;
        this.plannedMealRepository = plannedMealRepository;
    }

    @RequestMapping(method = RequestMethod.GET)
    public Page<PlannedMeal> getPlannedMeals(
            @RequestParam(defaultValue = "0", name = "page") Integer page,
            @RequestParam(name = "start", required=false) Calendar start,
            @RequestParam(name = "end", required=false) Calendar end,
            @AuthenticationPrincipal String familyName) {
        PageRequest request = new PageRequest(page, 100);
        if (start == null) {
            start = getBeginningOfWeek();
        }
        if (end == null) {
            end = getEndOfWeek();
        }
        return plannedMealRepository.findByPersonFamilyNameAndPlannedDateBetween(request, familyName, start, end);
    }

    @RequestMapping(method = RequestMethod.POST)
    public PlannedMeal createPlannedMeal(@RequestBody @Valid PlannedMeal plannedMeal, @AuthenticationPrincipal String familyName) {
        Family loadedFamily = familyRepository.findByName(familyName);
        plannedMeal.setMeal(checkMealAccess(loadedFamily, plannedMeal));
        plannedMeal.setPerson(checkPersonAccess(loadedFamily, plannedMeal));
        plannedMeal.setDishes(checkAccessToDishes(loadedFamily, plannedMeal));
        return plannedMealRepository.save(plannedMeal);
    }

    private List<Dish> checkAccessToDishes(Family family, PlannedMeal plannedMeal) {
        List<Dish> result = new ArrayList<>();
        for (Dish dish : plannedMeal.getDishes()) {
            Dish loadedDish = dishRespository.findOne(dish.getId());
            if (!Objects.equals(family.getId(), loadedDish.getFamily().getId())) {
                throw new NotAuthorizedException("You don't have access to this dish.");
            }
            result.add(loadedDish);
        }
        return result;
    }

    private Person checkPersonAccess(Family family, PlannedMeal plannedMeal) {
        Person loadedPerson = personRepository.findOne(plannedMeal.getPerson().getId());
        if (!Objects.equals(loadedPerson.getFamily().getId(), family.getId())) {
            throw new NotAuthorizedException("You don't have access to this person.");
        }
        return loadedPerson;
    }

    private Meal checkMealAccess(Family family, PlannedMeal plannedMeal) {
        Meal loadedMeal = mealRepository.findOne(plannedMeal.getMeal().getId());
        if (!Objects.equals(loadedMeal.getFamily().getId(), family.getId())) {
            throw new NotAuthorizedException("You don't have access to this meal.");
        }
        return loadedMeal;
    }

    /**
     * Returns the first hour of this week.
     */
    private Calendar getBeginningOfWeek() {
        Calendar newCalendar = Calendar.getInstance();
        newCalendar.set(Calendar.HOUR_OF_DAY, 0);
        newCalendar.clear(Calendar.MINUTE);
        newCalendar.clear(Calendar.SECOND);
        newCalendar.clear(Calendar.MILLISECOND);

        newCalendar.set(Calendar.DAY_OF_WEEK, newCalendar.getFirstDayOfWeek());
        return newCalendar;
    }

    /**
     * Returns the first hour of next week.
     */
    private Calendar getEndOfWeek() {
        Calendar newCalendar = Calendar.getInstance();
        newCalendar.set(Calendar.HOUR_OF_DAY, 0);
        newCalendar.clear(Calendar.MINUTE);
        newCalendar.clear(Calendar.SECOND);
        newCalendar.clear(Calendar.MILLISECOND);

        newCalendar.set(Calendar.DAY_OF_WEEK, newCalendar.getLeastMaximum(Calendar.DAY_OF_WEEK));
        newCalendar.add(Calendar.DAY_OF_WEEK, 1);
        return newCalendar;
    }

}
