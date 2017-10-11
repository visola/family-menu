package com.github.visola.familymenu.integrationtest;

import java.util.concurrent.TimeUnit;

import javax.sql.DataSource;

import org.openqa.selenium.NoAlertPresentException;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.FluentWait;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import liquibase.integration.spring.SpringLiquibase;

@Configuration
public class IntegrationTestConfiguration {

    @Bean
    public DatabaseCleaner databaseCleaner(DataSource dataSource,SpringLiquibase springLiquibase) {
        return new DatabaseCleaner(dataSource, springLiquibase);
    }

    @Bean(destroyMethod="quit")
    public WebDriver webDriver() {
        System.setProperty("webdriver.chrome.driver", System.getProperty("user.home") + "/bin/chromedriver");

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");

        return new ChromeDriver(options);
    }

    @Bean
    public FluentWait<WebDriver> fluentWait(WebDriver webDriver) {
        return new FluentWait<>(webDriver)
                .withTimeout(10, TimeUnit.SECONDS)
                .ignoring(NoSuchElementException.class)
                .ignoring(NoAlertPresentException.class);
    }

}
