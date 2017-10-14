package com.github.visola.familymenu.controller;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.github.visola.familymenu.controller.exception.BadRequestException;
import com.github.visola.familymenu.model.Family;
import com.github.visola.familymenu.repository.FamilyRepository;

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
        String originalPassword = "Another Password";
        Family family = new Family();
        family.setName("Test");
        family.setPassword(originalPassword);

        String encodedPassword = "MyEncodedPassword";
        Mockito.when(passwordEncoder.encode(family.getPassword())).thenReturn(encodedPassword);

        Mockito.when(familyRepository.save(family)).thenReturn(family);

        Family createdFamily = familyController.createFamily(family);
        Assert.assertEquals("Should return encoded password", encodedPassword, createdFamily.getPassword());

        Mockito.verify(passwordEncoder, Mockito.atLeastOnce()).encode(originalPassword);
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
