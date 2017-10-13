package com.github.visola.familymenu.controller;

import java.util.Objects;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.github.visola.familymenu.controller.exception.NotAuthorizedException;
import com.github.visola.familymenu.controller.view.PersonView;
import com.github.visola.familymenu.model.Family;
import com.github.visola.familymenu.model.Person;
import com.github.visola.familymenu.repository.FamilyRepository;
import com.github.visola.familymenu.repository.PersonRepository;

@RestController
@RequestMapping("${api.base.path}/people")
public class PersonController {

    private final FamilyRepository familyRepository;

    private final PersonRepository personRepository;

    @Autowired
    public PersonController(FamilyRepository familyRepository, PersonRepository personRepository) {
        this.familyRepository = familyRepository;
        this.personRepository = personRepository;
    }

    @RequestMapping(method = RequestMethod.GET)
    public Page<Person> getPeople(@RequestParam(defaultValue="0", name="page") Integer page, @AuthenticationPrincipal String familyName) {
        PageRequest request = new PageRequest(page, 25);
        return personRepository.findByFamilyName(request, familyName);
    }

    @RequestMapping(method = RequestMethod.POST)
    public Person createPerson(@RequestBody @Valid Person person, @AuthenticationPrincipal String familyName) {
        Family loadedFamily = familyRepository.findByName(familyName);
        if (!Objects.equals(person.getFamily().getId(), loadedFamily.getId())) {
            throw new NotAuthorizedException("You don't have permission to add a person to that family.");
        }

        person.setFamily(loadedFamily);
        return new PersonView(personRepository.save(person));
        
    }

}
