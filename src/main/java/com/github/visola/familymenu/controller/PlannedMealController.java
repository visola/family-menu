package com.github.visola.familymenu.controller;

import java.util.Calendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.github.visola.familymenu.model.PlannedMeal;
import com.github.visola.familymenu.repository.PlannedMealRepository;

@RequestMapping("${api.base.path}/plannedMeals")
@RestController
public class PlannedMealController {

    private final PlannedMealRepository plannedMealRepository;

    @Autowired
    public PlannedMealController(PlannedMealRepository plannedMealRepository) {
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
