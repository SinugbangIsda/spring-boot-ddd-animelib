package com.sunognaisda.animelib.impl.domain.service;

import com.sunognaisda.animelib.domain.model.User;
import com.sunognaisda.animelib.domain.repository.UserRepository;
import com.sunognaisda.animelib.domain.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository repository;

    @Override
    public User registerUser(User user) {
        user.setId(UUID.randomUUID().toString());
        return repository.save(user);
    }

}
