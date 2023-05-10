package com.sunognaisda.animelib.impl.domain.service;

import com.sunognaisda.animelib.domain.repository.UserRepository;
import com.sunognaisda.animelib.domain.model.User;
import com.sunognaisda.animelib.domain.service.UserService;
import com.sunognaisda.animelib.infra.util.Sha512HashUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void registerUser(User user) {
        String hashedPassword = Sha512HashUtil.encryptPassword(user.getPassword());
        user.setPassword(hashedPassword);
        userRepository.insert(user);
    }

    @Override
    public User loginUser(long userId) {
       return userRepository.selectById(userId);
    }
}
