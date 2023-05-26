package com.sunognaisda.animelib.domain.repository;

import com.github.database.rider.core.api.dataset.DataSet;
import com.sunognaisda.animelib.SpringBootBaseTest;
import com.sunognaisda.animelib.domain.model.User;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataSet("db/datasets/user.xml")
public class UserRepositoryTests extends SpringBootBaseTest {
    @Autowired
    UserRepository userRepository;

    @Test
    @Order(1)
    void testGetUserByEmail_WhenUserIsFound_ShouldReturnUserData() {
        String queriedEmail = "Bontes@gmail.com";

        Optional<User> queriedUser = userRepository.getUserByEmail(queriedEmail);

        assertThat(queriedUser).isPresent();
    }

    @Test
    @Order(2)
    void testGetUserByEmail_WhenUserIsNotFound_ShouldReturnEmpty() {
        String queriedEmail = "NO EMAIL";

        Optional<User> queriedUser = userRepository.getUserByEmail(queriedEmail);

        assertThat(queriedUser).isEmpty();
    }

    @Test
    @Order(3)
    void testGetUsersByRole_WhenRoleExists_ShouldReturnAllUsersUnderRole() {
        String queriedRole = "user";

        List<User> queriedUsers = userRepository.getUsersByRole(queriedRole);

        assertThat(queriedUsers).isNotEmpty();
    }

    @Test
    @Order(4)
    void testGetUsersByRole_WhenRoleDoesNotExist_ShouldReturnEmpty() {
        String queriedRole = "empty";

        List<User> queriedUsers = userRepository.getUsersByRole(queriedRole);

        assertThat(queriedUsers).isEmpty();
    }

    @Test
    @Order(5)
    void testGetAllActiveUsers_WhenCalled_ShouldReturnAllUserDataWhereIsDeletedIsZero() {
        List<User> queriedUsers = userRepository.getAllActiveUsers();

        assertThat(queriedUsers).isNotEmpty();
    }
}
