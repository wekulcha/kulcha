package org.kulcha.mvp.service;

import lombok.RequiredArgsConstructor;
import org.kulcha.mvp.repository.UserRepository;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserService {

    private UserRepository userRepository;

}
