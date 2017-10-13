package com.github.visola.familymenu.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class Family implements Serializable {

    private static final long serialVersionUID = 1L;

    @GeneratedValue
    @Id
    private Integer id;
    @NotNull
    @Size(min = 2, max = 255)
    private String name;
    @NotNull
    @Size(min = 2)
    private String password;
    @NotNull
    @Size(min = 5)
    private String email;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
