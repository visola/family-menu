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
        String name = "test";
        String password = "password";
        createFamily(name, password);

        goToLoginPage();
        webDriver.findElement(By.xpath("//input[1]")).sendKeys(name);
        webDriver.findElement(By.xpath("//input[2]")).sendKeys(password);
        webDriver.findElement(By.cssSelector("button")).click();

        waitUntil(d -> d.findElement(By.xpath("//*[contains(text(), 'You have')]")));
    }

    @Test
    public void failedToLoginWithWrongPassword() {
        String name = "test";
        String password = "password";
        createFamily(name, password);

        goToLoginPage();
        webDriver.findElement(By.xpath("//input[1]")).sendKeys(name);
        webDriver.findElement(By.xpath("//input[2]")).sendKeys("notMyPassword");
        webDriver.findElement(By.cssSelector("button")).click();

        waitUntil(d -> d.findElement(By.xpath("//*[contains(text(), 'Wrong family name/password combination.')]")));
    }

    private void goToLoginPage() {
        webDriver.navigate().to("http://localhost:8080");
        waitUntil(d -> d.findElement(By.id("container")));
    }

    private Family createFamily(String name, String password) {
        Family family = new Family();
        family.setName(name);
        family.setEmail(name + "@" + name + ".com");
        family.setPassword(password);

        return familyController.createFamily(family);
    }

}
