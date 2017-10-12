package com.github.visola.familymenu.integrationtest;

import javax.sql.DataSource;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import liquibase.integration.spring.SpringLiquibase;

@Configuration
@Profile("integration-test")
public class IntegrationTestConfiguration {

    @Value("${test.chrome.webdriver.path:${user.home}/bin/chromedriver}")
    private String pathToWebDriver;

    @Bean
    public DatabaseCleaner databaseCleaner(DataSource dataSource,SpringLiquibase springLiquibase) {
        return new DatabaseCleaner(dataSource, springLiquibase);
    }

    @Bean(destroyMethod="quit")
    public WebDriver webDriver() {
        System.setProperty("webdriver.chrome.driver", pathToWebDriver);

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");

        return new ChromeDriver(options);
    }

}
