package com.sunognaisda.animelib.impl.domain.service;

import com.sunognaisda.animelib.domain.mapper.UserMapper;
import com.sunognaisda.animelib.domain.model.User;
import com.sunognaisda.animelib.domain.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public void registerUser(User user) {
        userMapper.insert(user);
    }

    @Override
    public Object getUserById(long user_id) {
       return userMapper.selectById(user_id);
    }
}
