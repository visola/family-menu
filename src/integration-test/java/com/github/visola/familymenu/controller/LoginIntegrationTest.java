package com.github.visola.familymenu.controller;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.springframework.beans.factory.annotation.Autowired;

import com.github.visola.familymenu.integrationtest.AbstractIntegrationTest;
import com.github.visola.familymenu.model.Family;

public class LoginIntegrationTest extends AbstractIntegrationTest {

    @Autowired
    private FamilyController familyController;

    @Autowired
    private WebDriver webDriver;

    @Test
    public void userCanLoginWithExistingFamily() {
        Family family = new Family();
        family.setName("test");
        family.setPassword("password");

        familyController.createFamily(family);

        webDriver.navigate().to("http://localhost:8080");

        waitUntil(d -> d.findElement(By.id("container")));
        System.out.println(webDriver.findElement(By.tagName("body")).getAttribute("innerHTML"));
    }

}
