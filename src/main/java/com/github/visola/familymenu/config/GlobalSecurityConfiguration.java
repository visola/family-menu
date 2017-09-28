package com.github.visola.familymenu.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configurers.GlobalAuthenticationConfigurerAdapter;

@Configuration
public class GlobalSecurityConfiguration extends GlobalAuthenticationConfigurerAdapter {

    @Autowired
    private FamilyUserDetailsService familyUserDetailsService;

    protected void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(familyUserDetailsService);
    }

}
