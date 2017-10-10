package com.github.visola.familymenu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.visola.spring.security.tokenfilter.TokenService;

@RestController
public class LoginController {

    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    @Autowired
    public LoginController(AuthenticationManager authenticationManager, TokenService tokenService) {
      this.authenticationManager = authenticationManager;
      this.tokenService = tokenService;
    }

    @RequestMapping(value="/api/v1/login", method=RequestMethod.POST)
    public LoginResponse login(@RequestBody LoginRequest loginRequest) {
      Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getName(), loginRequest.getPassword()));
      return new LoginResponse(tokenService.generateToken(authentication));
    }

}
