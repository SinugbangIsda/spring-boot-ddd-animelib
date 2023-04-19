package com.sunognaisda.animelib.application.rest;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.sunognaisda.animelib.application.dto.ErrorContent;
import com.sunognaisda.animelib.application.dto.user.UserLoginRequest;
import com.sunognaisda.animelib.application.dto.user.UserResponse;
import com.sunognaisda.animelib.application.rest.service.JwtService;
import com.sunognaisda.animelib.domain.mapper.UserMapper;
import com.sunognaisda.animelib.domain.model.User;
import com.sunognaisda.animelib.domain.service.UserService;
import com.sunognaisda.animelib.infra.util.Sha512HashUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    private UserMapper userMapper;

    @PostMapping("register")
    public void registerUser(@RequestBody User user){
        userService.registerUser(user);
    }

    @PostMapping("login")
    public ResponseEntity<UserResponse> loginUser (@RequestBody UserLoginRequest userLoginRequest) {
        try {
            QueryWrapper<User> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("email_address", userLoginRequest.getEmailAddress());
            Optional<User> queriedUser = Optional.ofNullable(userMapper.selectOne(queryWrapper));
            if (!queriedUser.isPresent()) {
                throw new Exception("User not found");
            }

            // Check credentials
            String password = userLoginRequest.getPassword();
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

    //    @PostMapping("{user_id}/validate")
    //    public User validateUser(@PathVariable("user_id") long userId, @RequestBody(required = true) User _user) {
    //        return null;
    //    }

}
