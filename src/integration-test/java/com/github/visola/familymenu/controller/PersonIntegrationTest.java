package com.github.visola.familymenu.controller;

import java.util.List;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.springframework.beans.factory.annotation.Autowired;

import com.github.visola.familymenu.integrationtest.AbstractIntegrationTest;
import com.github.visola.familymenu.model.Family;

public class PersonIntegrationTest extends AbstractIntegrationTest {

    @Autowired
    private FamilyController familyController;

    @Autowired
    private WebDriver webDriver;

    @Test
    public void canAddPeopleToFamily() {
        String personName = "John";
        createFamilyAndLogin();

        WebElement peopleControls = webDriver.findElement(By.xpath("//div[@class='people']"));

        peopleControls.findElement(By.xpath("//p[@class='status']/span")).click();
        peopleControls.findElement(By.xpath("//*[@class='people-list']/button")).click();

        WebElement addPersonForm = peopleControls.findElement(By.tagName("form"));
        List<WebElement> inputs = addPersonForm.findElements(By.tagName("input"));
        inputs.get(0).sendKeys(personName);
        inputs.get(1).sendKeys("john@gmail.com");

        peopleControls.findElement(By.xpath("//button[contains(text(),'Save')]")).click();

        waitUntil(d -> d.findElement(By.xpath("//*[contains(text(), '"+personName+"')]")));
    }

    private void createFamilyAndLogin() {
        String name = "test";
        String password = "password";
        createFamily(name, password);

        goToLoginPage();
        webDriver.findElement(By.xpath("//input[1]")).sendKeys(name);
        webDriver.findElement(By.xpath("//input[2]")).sendKeys(password);
        webDriver.findElement(By.cssSelector("button")).click();

        waitUntil(d -> d.findElement(By.xpath("//*[contains(text(), 'You have')]")));
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
