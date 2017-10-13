package com.github.visola.familymenu.integrationtest;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import liquibase.exception.LiquibaseException;
import liquibase.integration.spring.SpringLiquibase;

public class DatabaseCleaner {

    private static final Logger LOGGER = LoggerFactory.getLogger(DatabaseCleaner.class);

    private final DataSource dataSource;
    private final SpringLiquibase springLiquibase;

    public DatabaseCleaner (DataSource dataSource,SpringLiquibase springLiquibase) {
        this.dataSource = dataSource;
        this.springLiquibase = springLiquibase;
    }

    @SuppressFBWarnings("ODR_OPEN_DATABASE_RESOURCE")
    public void cleanDatabase() throws LiquibaseException, SQLException {
        boolean tableFound = true;

        while (tableFound) {
            try (Connection conn = dataSource.getConnection()) {
                tableFound = false;
                DatabaseMetaData md = conn.getMetaData();
                ResultSet rs = md.getTables(null, "public", "%", new String[] {"TABLE", "SEQUENCE"});
                while (rs.next()) {
                    tableFound = true;
                    String name = rs.getString("TABLE_NAME");
                    String type = rs.getString("TABLE_TYPE");
                    try {
                        LOGGER.debug("Dropping {}: {}", type, name);
                        conn.createStatement().executeUpdate("drop " + type + " " + name);
                    } catch (SQLException sqle) {
                        LOGGER.info("Failed to drop {}: {}\n{}", type, name, sqle.getMessage());
                    }
                }
            }
        }

        // Triggers schema creation
        springLiquibase.afterPropertiesSet();
    }

}
