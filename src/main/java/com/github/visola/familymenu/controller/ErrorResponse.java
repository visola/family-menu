package com.github.visola.familymenu.controller;

public class ErrorResponse {

    private final String message;
    private final Boolean error = true;

    public ErrorResponse(String message) {
        this.message = message;
    }

    public Boolean getError() {
        return error;
    }

    public String getMessage() {
        return message;
    }

}
