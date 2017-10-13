package com.github.visola.familymenu.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.github.visola.familymenu.model.Family;
import com.github.visola.familymenu.model.FamilyUserDetailsWrapper;
import com.github.visola.familymenu.repository.FamilyRepository;

@Component
public class FamilyUserDetailsService implements UserDetailsService {

    private FamilyRepository familyRepository;

    @Autowired
    public FamilyUserDetailsService(FamilyRepository familyRepository) {
        this.familyRepository = familyRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String emailOrFamilyName) throws UsernameNotFoundException {
        Family family = familyRepository.findByEmail(emailOrFamilyName);
        if (family == null) {
            family = familyRepository.findByName(emailOrFamilyName);
        }
        if (family == null) {
            throw new UsernameNotFoundException("Family with name " + emailOrFamilyName + " doesn't exist.");
        }
        return new FamilyUserDetailsWrapper(family);
    }

}
