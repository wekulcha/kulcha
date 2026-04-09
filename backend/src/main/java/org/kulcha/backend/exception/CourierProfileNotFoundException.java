package org.kulcha.backend.exception;

public class CourierProfileNotFoundException extends ResourceNotFoundException {

    public CourierProfileNotFoundException(Long userId) {
        super("Courier profile for user", userId);
    }
}
