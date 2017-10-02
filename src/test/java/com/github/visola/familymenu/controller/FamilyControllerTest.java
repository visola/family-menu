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
    public void setup() {
        familyController = new FamilyController(familyRepository, passwordEncoder);
    }

    @Test
    public void doesNotExposeFamilyPassword() {
        Family mockFamily = new Family();
        mockFamily.setId(1);
        mockFamily.setName("Test");
        mockFamily.setPassword("Some Password");

        Mockito.when(familyRepository.findOne(mockFamily.getId())).thenReturn(mockFamily);

        Family family = familyController.getFamily(1);
        Assert.assertNotEquals(mockFamily.getPassword(), family.getPassword(), "Should not match family password");
        MatcherAssert.assertThat(family.getPassword(), RegexMatchers.matchesPattern("\\*+"));
    }

}
