package com.sunognaisda.animelib.application.rest;

import cn.hutool.json.JSONObject;
import com.sunognaisda.animelib.domain.model.User;
import com.sunognaisda.animelib.domain.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("register")
    public void registerUser(@RequestBody(required = true) User _user){
        userService.registerUser(_user);
    }

    @GetMapping("{user_id}")
    public Object getUserById(@PathVariable("user_id") long user_id) {
        return userService.getUserById(user_id);
    }
}
