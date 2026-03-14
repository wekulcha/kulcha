package org.kulcha.backend.exception;

public class SubscriptionLogNotFoundException extends ResourceNotFoundException {

    public SubscriptionLogNotFoundException(Long id) {
        super("SubscriptionLog", id);
    }
}
