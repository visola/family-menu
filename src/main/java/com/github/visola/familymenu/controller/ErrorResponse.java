package com.github.visola.familymenu.controller;

public class ErrorResponse {

    private final Boolean error = true;
    private final String message;

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
