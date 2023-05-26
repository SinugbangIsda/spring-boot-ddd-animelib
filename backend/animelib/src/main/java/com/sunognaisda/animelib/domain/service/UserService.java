package com.sunognaisda.animelib.domain.service;

import com.sunognaisda.animelib.domain.model.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    /**
     * Adds the new User data into the database.
     *
     * @param user contains all data of a user
     */
    void registerUser(User user);
}
