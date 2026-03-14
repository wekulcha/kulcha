package org.kulcha.backend.exception;

public class CourierNotFoundException extends ResourceNotFoundException {

    public CourierNotFoundException(Long id) {
        super("Courier", id);
    }
}
