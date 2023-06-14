package com.example.FoodOrdering.exception;

public class MenuNotFoundException extends Exception{
    public MenuNotFoundException() {
        super();
    }

    public MenuNotFoundException(String message) {
        super(message);
    }

    public MenuNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public MenuNotFoundException(Throwable cause) {
        super(cause);
    }

    protected MenuNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
