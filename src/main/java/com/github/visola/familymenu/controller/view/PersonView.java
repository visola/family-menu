package com.github.visola.familymenu.controller.view;

import com.github.visola.familymenu.model.Family;
import com.github.visola.familymenu.model.Person;

public class PersonView extends Person {

    private final Person deleagte;
    
    public PersonView(Person delegate) {
        this.deleagte = delegate;
    }

    public Integer getId() {
        return deleagte.getId();
    }

    public void setId(Integer id) {
        deleagte.setId(id);
    }

    public String getName() {
        return deleagte.getName();
    }

    public void setName(String name) {
        deleagte.setName(name);
    }

    public String getEmail() {
        return deleagte.getEmail();
    }

    public void setEmail(String email) {
        deleagte.setEmail(email);
    }

    public Family getFamily() {
        return new FamilyView(deleagte.getFamily());
    }

    public void setFamily(Family family) {
        deleagte.setFamily(family);
    }

}
