package com.github.visola.familymenu.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;

@ControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ModelAndView handleResourceNotFound(ResourceNotFoundException exception) {
        ModelAndView mv = new ModelAndView();
        mv.setStatus(HttpStatus.NOT_FOUND);
        mv.addObject(exception);
        return mv;
    }

}
