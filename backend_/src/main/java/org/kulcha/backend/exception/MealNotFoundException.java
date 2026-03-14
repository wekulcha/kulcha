package org.kulcha.backend.exception;

public class MealNotFoundException extends ResourceNotFoundException {

    public MealNotFoundException(Long id) {
        super("Meal", id);
    }
}
