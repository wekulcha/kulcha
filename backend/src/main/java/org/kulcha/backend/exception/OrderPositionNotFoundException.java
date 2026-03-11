package org.kulcha.backend.exception;

public class OrderPositionNotFoundException extends ResourceNotFoundException {

    public OrderPositionNotFoundException(Long id) {
        super("OrderPosition", id);
    }
}
