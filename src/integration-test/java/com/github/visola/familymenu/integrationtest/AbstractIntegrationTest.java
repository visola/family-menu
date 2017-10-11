package com.github.visola.familymenu.integrationtest;

import java.sql.SQLException;
import java.util.function.Function;

import org.junit.Before;
import org.junit.runner.RunWith;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.FluentWait;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit4.SpringRunner;

import com.github.visola.familymenu.Main;

import liquibase.exception.LiquibaseException;

@Import(IntegrationTestConfiguration.class)
@RunWith(SpringRunner.class)
@SpringBootTest(classes=Main.class)
public abstract class AbstractIntegrationTest {

    @Autowired
    private DatabaseCleaner databaseCleaner;

    @Autowired
    private FluentWait<WebDriver> fluentWait;

    @Before
    public void setUp() throws LiquibaseException, SQLException {
        databaseCleaner.cleanDatabase();
    }

    protected <V> V waitUntil(Function<? super WebDriver, V> isTrue) {
        return fluentWait.until(isTrue);
    }

}
