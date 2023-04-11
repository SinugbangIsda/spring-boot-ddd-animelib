package com.sunognaisda.animelib.application.rest;

import com.sunognaisda.animelib.domain.model.User;
import com.sunognaisda.animelib.domain.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("register")
    public ResponseEntity<User> registerUser(@RequestBody(required = true) User _user) {
        try {
            User user = userService.registerUser(_user);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            return  new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
