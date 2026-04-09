package org.kulcha.backend.exception;

public class RestaurantNotFoundException extends ResourceNotFoundException {

    public RestaurantNotFoundException(Long id) {
        super("Restaurant", id);
    }
}
