package com.github.visola.familymenu.controller.view;

import com.github.visola.familymenu.model.Family;

public class FamilyView extends Family {

    private static final long serialVersionUID = 1L;

    private final Family delegate;

    public FamilyView(Family delegate) {
        this.delegate = delegate;
    }

    public Integer getId() {
        return delegate.getId();
    }

    public void setId(Integer id) {
        delegate.setId(id);
    }

    public String getName() {
        return delegate.getName();
    }

    public String getPassword() {
        return "****";
    }

    public void setPassword(String password) {
        delegate.setPassword(password);
    }

    public void setName(String name) {
        delegate.setName(name);
    }

}
