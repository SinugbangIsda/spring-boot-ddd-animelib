package com.sunognaisda.animelib.impl.domain.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.github.database.rider.core.api.dataset.DataSet;
import com.sunognaisda.animelib.SpringBootBaseTest;
import com.sunognaisda.animelib.domain.model.User;
import com.sunognaisda.animelib.domain.repository.UserRepository;
import com.sunognaisda.animelib.domain.service.UserService;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataSet("db/datasets/user.xml")
public class UserServiceImplTests extends SpringBootBaseTest {
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    // User Registration Tests
    @Test
    @Order(1)
    void testRegisterUser_WhenUserRegisters_ShouldAddUserDataToDatabase() {
        // Test User Data
        User testUser = new User();
        testUser.setLastName("Dalangin");
        testUser.setFirstName("Raphael");
        testUser.setEmailAddress("raphile14@gmail.com");
        testUser.setImageURI("a");
        testUser.setRole("user");
        testUser.setPassword("Raphile14");

        userService.registerUser(testUser);

        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("email_address", testUser.getEmailAddress());
        Optional<User> queriedUser = Optional.ofNullable(userRepository.selectOne(queryWrapper));

        assertThat(queriedUser).isPresent();
    }

//    @Test
//    @Order(2)
//    void testRegisterUser_WhenThereIsMissingInformation_ShouldFailToRegister() {
//    }
}
