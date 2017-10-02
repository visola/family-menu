package com.github.visola.familymenu.controller;

import org.postgresql.util.PSQLException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;

@ControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(code = HttpStatus.NOT_FOUND)
    public ModelAndView handleResourceNotFound(Exception e) {
        ModelAndView mv = new ModelAndView();
        mv.setStatus(HttpStatus.NOT_FOUND);
        mv.addObject(e);
        return mv;
    }

    @ExceptionHandler({BadRequestException.class, PSQLException.class})
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    // TODO: This is returning a 404, not a 400
    public ModelAndView handleBadRequest(Exception e) {
        ModelAndView mv = new ModelAndView();
        mv.setStatus(HttpStatus.BAD_REQUEST);
        mv.addObject(e);
        return mv;
    }

}
