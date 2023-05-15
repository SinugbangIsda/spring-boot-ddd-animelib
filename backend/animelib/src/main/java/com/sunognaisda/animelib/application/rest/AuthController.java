package com.sunognaisda.animelib.application.rest;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.sunognaisda.animelib.application.dto.ErrorContent;
import com.sunognaisda.animelib.application.dto.user.UserLoginRequest;
import com.sunognaisda.animelib.application.dto.user.UserResponse;
import com.sunognaisda.animelib.application.rest.support.JwtService;
import com.sunognaisda.animelib.domain.repository.UserRepository;
import com.sunognaisda.animelib.domain.model.User;
import com.sunognaisda.animelib.domain.service.UserService;
import com.sunognaisda.animelib.infra.util.Sha512HashUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("register")
    public void registerUser(@RequestBody User user){
        userService.registerUser(user);
    }

    @PostMapping("login")
    public ResponseEntity<UserResponse> loginUser (@RequestBody UserLoginRequest userLoginRequest) {
        try {
            QueryWrapper<User> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("email_address", userLoginRequest.emailAddress());
            Optional<User> queriedUser = Optional.ofNullable(userRepository.selectOne(queryWrapper));

            if (queriedUser.isEmpty()) {
                throw new Exception("User not found");
            }

            // Check credentials
            String password = userLoginRequest.password();
            String dbHashedPassword = queriedUser.get().getPassword();
            boolean verifyPassword = Sha512HashUtil.verifyPassword(password, dbHashedPassword);

            if (!verifyPassword) {
                throw new Exception("Incorrect Password");
            }

            // Generate JWT
            String token = jwtService.generateToken(queriedUser.get());
            return ResponseEntity.ok()
                    .body(new UserResponse(queriedUser.get(), token,null));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new UserResponse(null, null, new ErrorContent("Login Error", e.getMessage())));
        }
    }

}
