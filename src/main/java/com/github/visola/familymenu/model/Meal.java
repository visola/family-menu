package com.github.visola.familymenu.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * A meal represents a daily meal like <bold>lunch</bold> or <bold>dinner</bold>.
 */
@Entity
public class Meal {

	@GeneratedValue
	@Id
	private Integer id;
	@NotNull
	@Size(min = 2)
	private String name;
	private Integer position;
    @ManyToOne
    private Family family;

    public Meal() {
    }
    
    public Meal(String name, Integer position, Family family) {
    		this.name = name;
    		this.position = position;
    		this.family = family;
    }

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getPosition() {
		return position;
	}

	public void setPosition(Integer position) {
		this.position = position;
	}

	public Family getFamily() {
		return family;
	}

	public void setFamily(Family family) {
		this.family = family;
	}
	
}
