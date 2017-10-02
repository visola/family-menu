package com.github.visola.familymenu.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.visola.spring.security.tokenfilter.TokenAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    /**
     * The starter bundle will provide a TokenAuthenticationFilter for you.
     */
    @Autowired
    private TokenAuthenticationFilter tokenAuthenticationFilter;

    @Value("${api.base.path}")
    private String baseApiPath;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // This will make your app completely stateless
        http.csrf().disable().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // Add the TokenAuthenticationFilter to your filter chain
        http.addFilterBefore(tokenAuthenticationFilter, BasicAuthenticationFilter.class);

        http
          .authorizeRequests()

          // Authenticate endpoint can be access by anyone
          .antMatchers(baseApiPath + "/login").anonymous()
          .mvcMatchers(HttpMethod.POST, baseApiPath + "/family").anonymous()

          // All Others API calls will be secure
          .antMatchers(baseApiPath + "/**").authenticated();
    }

}
