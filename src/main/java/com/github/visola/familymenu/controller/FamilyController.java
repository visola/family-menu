package com.github.visola.familymenu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.github.visola.familymenu.model.Family;
import com.github.visola.familymenu.repository.FamilyRepository;

@RestController
@RequestMapping("${api.base.path}/family")
public class FamilyController {

    private final FamilyRepository familyRepository;

    @Autowired
    public FamilyController(FamilyRepository familyRepository) {
        this.familyRepository = familyRepository;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    public Family getFamily(@PathVariable Integer id) {
        Family loadedFamily = familyRepository.findOne(id);
        if (loadedFamily == null) {
            throw new ResourceNotFoundException("Family with ID " + id + " does not exist.");
        }
        return loadedFamily;
    }

}
