package com.github.visola.familymenu.controller;

import org.hamcrest.MatcherAssert;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.github.visola.familymenu.model.Family;
import com.github.visola.familymenu.repository.FamilyRepository;
import com.jcabi.matchers.RegexMatchers;

@RunWith(MockitoJUnitRunner.class)
public class FamilyControllerTest {

    @Mock
    private FamilyRepository familyRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    private FamilyController familyController;

    @Before
    public void setUp() {
        familyController = new FamilyController(familyRepository, passwordEncoder);
    }

    @Test
    public void doesNotExposeFamilyPassword() {
        Family mockFamily = setupFamilyRepositoryWithOneFamily();

        Family family = familyController.getFamily(1);
        Assert.assertEquals("Should match ID correctly", mockFamily.getId(), family.getId());
        Assert.assertEquals("Should match name correctly", mockFamily.getName(), family.getName());
        MatcherAssert.assertThat(family.getPassword(), RegexMatchers.matchesPattern("\\*+"));
    }

    @Test(expected=ResourceNotFoundException.class)
    public void throwsIfFamilyNotFound() {
        familyController.getFamily(1);
    }

    @Test(expected=BadRequestException.class)
    public void throwsIfCreatingFamilyThatAlreadyExist() {
        setupFamilyRepositoryWithOneFamily();

        Family family = new Family();
        family.setName("Test");
        family.setPassword("Another Password");

        familyController.createFamily(family);
    }

    @Test(expected=BadRequestException.class)
    public void throwsIfTryingToUpdateFamily() {
        setupFamilyRepositoryWithOneFamily();

        Family family = new Family();
        family.setId(1);
        family.setName("Test");
        family.setPassword("Another Password");

        familyController.createFamily(family);
    }

    @Test
    public void encodePasswordBeforeCreatingFamily() {
        Family family = new Family();
        family.setName("Test");
        family.setPassword("Another Password");

        String encodedPassword = "MyEncodedPassword";
        Mockito.when(passwordEncoder.encode(family.getPassword())).thenReturn(encodedPassword);

        Mockito.when(familyRepository.save(family)).thenReturn(family);

        Family createdFamily = familyController.createFamily(family);
        Assert.assertEquals("Should encode password before saving.", encodedPassword, createdFamily.getPassword());
    }

    private Family setupFamilyRepositoryWithOneFamily() {
        Family mockFamily = new Family();
        mockFamily.setId(1);
        mockFamily.setName("Test");
        mockFamily.setPassword("Some Password");

        Mockito.when(familyRepository.findOne(mockFamily.getId())).thenReturn(mockFamily);
        Mockito.when(familyRepository.findByName(mockFamily.getName())).thenReturn(mockFamily);

        return mockFamily;
    }

}
