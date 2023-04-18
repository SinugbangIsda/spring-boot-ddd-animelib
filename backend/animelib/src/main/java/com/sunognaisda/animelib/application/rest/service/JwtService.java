package com.sunognaisda.animelib.application.rest.service;

import com.sunognaisda.animelib.domain.model.User;
import org.springframework.stereotype.Service;

@Service
public interface JwtService {

    String generateToken(User user);

    String validateTokenAndGetId(String token);
}
