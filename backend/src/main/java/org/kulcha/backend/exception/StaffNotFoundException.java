package org.kulcha.backend.exception;

public class StaffNotFoundException extends ResourceNotFoundException {

    public StaffNotFoundException(Long id) {
        super("Staff", id);
    }
}
