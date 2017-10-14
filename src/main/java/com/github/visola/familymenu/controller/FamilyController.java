package com.github.visola.familymenu.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.github.visola.familymenu.controller.exception.BadRequestException;
import com.github.visola.familymenu.model.Family;
import com.github.visola.familymenu.repository.FamilyRepository;

@RestController
@RequestMapping("${api.base.path}/families")
public class FamilyController {

    private final FamilyRepository familyRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public FamilyController(FamilyRepository familyRepository, PasswordEncoder passwordEncoder) {
        this.familyRepository = familyRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @RequestMapping(method = RequestMethod.POST)
    public Family createFamily(@RequestBody @Valid Family family) {
        if (family.getId() == null) {
            Family loaded = familyRepository.findByName(family.getName());
            if (loaded != null) {
                throw new BadRequestException("Family name already taken.");
            }

            family.setPassword(passwordEncoder.encode(family.getPassword()));
            return familyRepository.save(family);
        }
        throw new BadRequestException("Not suppose to update family throw this endpoint.");
    }

}
