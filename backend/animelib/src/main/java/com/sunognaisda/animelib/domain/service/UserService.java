package com.sunognaisda.animelib.domain.service;

import com.sunognaisda.animelib.domain.model.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    void registerUser(User user);

    Object getUserById(long user_id);

}
