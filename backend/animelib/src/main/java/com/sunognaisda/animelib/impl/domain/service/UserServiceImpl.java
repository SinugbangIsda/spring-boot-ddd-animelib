package com.sunognaisda.animelib.impl.domain.service;

import com.sunognaisda.animelib.domain.mapper.UserMapper;
import com.sunognaisda.animelib.domain.model.User;
import com.sunognaisda.animelib.domain.service.UserService;
import com.sunognaisda.animelib.infra.util.Sha512HashUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public void registerUser(User user) {
        String hashedPassword = Sha512HashUtil.encryptPassword(user.getPassword());
        user.setPassword(hashedPassword);
        userMapper.insert(user);
    }

    @Override
    public User loginUser(long userId) {
       return userMapper.selectById(userId);
    }
}
