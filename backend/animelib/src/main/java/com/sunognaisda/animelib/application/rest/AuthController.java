package com.sunognaisda.animelib.application.rest;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.sunognaisda.animelib.application.dto.ErrorContent;
import com.sunognaisda.animelib.application.dto.user.UserLoginRequest;
import com.sunognaisda.animelib.application.dto.user.UserLoginResponse;
import com.sunognaisda.animelib.application.rest.service.JwtService;
import com.sunognaisda.animelib.domain.mapper.UserMapper;
import com.sunognaisda.animelib.domain.model.User;
import com.sunognaisda.animelib.domain.service.UserService;
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

    @GetMapping("login")
    public ResponseEntity<UserLoginResponse> loginUser (@RequestBody UserLoginRequest userLoginRequest) {
        try {
            QueryWrapper<User> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("emailAddress", userLoginRequest.getEmailAddress());
            Optional<User> queriedUser = Optional.ofNullable(userMapper.selectOne(queryWrapper));
            if (!queriedUser.isPresent()) {
                throw new Exception("User not found");
            }

            // Generate JWT
            String token = jwtService.generateToken(queriedUser.get());
            HttpHeaders headers = new HttpHeaders();
            headers.set("X-Access-Token", token);
            return ResponseEntity.ok().headers(headers)
                    .body(new UserLoginResponse(queriedUser.get(), null));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new UserLoginResponse(null, new ErrorContent("Login Error", e.getMessage())));
        }
    }

    //    @PostMapping("{user_id}/validate")
    //    public User validateUser(@PathVariable("user_id") long userId, @RequestBody(required = true) User _user) {
    //        return null;
    //    }

}
