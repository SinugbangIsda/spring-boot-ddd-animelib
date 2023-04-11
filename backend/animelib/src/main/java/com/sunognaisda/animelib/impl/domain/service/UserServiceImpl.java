package com.sunognaisda.animelib.impl.domain.service;

import com.sunognaisda.animelib.domain.model.User;
import com.sunognaisda.animelib.domain.service.UserService;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
    @Override
    public User registerUser(User user) {
        user.setId(UUID.randomUUID().toString());
        return null;
    }

}
