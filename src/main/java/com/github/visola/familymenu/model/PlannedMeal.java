package com.github.visola.familymenu.model;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * A planned meal is a group of {@link Dish dishes} that will be served for someone on a specific {@link Meal meal} on a
 * specific date.
 */
@Entity
public class PlannedMeal {

    @GeneratedValue
    @Id
    private Integer id;
    @Temporal(TemporalType.DATE)
    private Calendar plannedDate;
    @ManyToOne
    private Person person;
    @ManyToOne
    private Meal meal;
    @ManyToMany
    private List<Dish> dishes = new ArrayList<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Calendar getPlannedDate() {
        return plannedDate;
    }

    public void setPlannedDate(Calendar plannedDate) {
        this.plannedDate = plannedDate;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public Meal getMeal() {
        return meal;
    }

    public void setMeal(Meal meal) {
        this.meal = meal;
    }

    public List<Dish> getDishes() {
        return dishes;
    }

    public void setDishes(List<Dish> dishes) {
        this.dishes = dishes;
    }

}
