package com.github.visola.familymenu.integrationtest;

import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;

import org.apache.commons.io.FileUtils;
import org.junit.After;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.openqa.selenium.NoAlertPresentException;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.FluentWait;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import com.github.visola.familymenu.Main;

import liquibase.exception.LiquibaseException;

@ActiveProfiles("integration-test")
@RunWith(SpringRunner.class)
@SpringBootTest(classes=Main.class)
public abstract class AbstractIntegrationTest {

    @Autowired
    private DatabaseCleaner databaseCleaner;

    private FluentWait<WebDriver> fluentWait;

    @Autowired
    private WebDriver webDriver;

    @Before
    public void setUp() throws LiquibaseException, SQLException {
        databaseCleaner.cleanDatabase();

        fluentWait = new FluentWait<>(webDriver)
                .withTimeout(10, TimeUnit.SECONDS)
                .ignoring(NoSuchElementException.class)
                .ignoring(NoAlertPresentException.class);
    }

    @After
    public void takeScreenshot() throws IOException {
        File output = new File("build/screenshot.png");
        FileUtils.deleteQuietly(output);
        File screenshot = ((TakesScreenshot) webDriver).getScreenshotAs(OutputType.FILE);
        FileUtils.moveFile(screenshot, output);
    }

    protected <V> V waitUntil(Function<? super WebDriver, V> isTrue) {
        return fluentWait.until(isTrue);
    }

}
