package com.github.visola.familymenu.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class FamilyUserDetailsWrapper implements UserDetails {

    private static final long serialVersionUID = 1L;
    private static final List<? extends GrantedAuthority> EMPTY_LIST = new ArrayList<>();

    private final Family family;

    public FamilyUserDetailsWrapper(Family family) {
        this.family = family;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return EMPTY_LIST;
    }

    @Override
    public String getPassword() {
        return family.getPassword();
    }

    @Override
    public String getUsername() {
        return family.getName();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
