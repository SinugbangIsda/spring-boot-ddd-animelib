package com.sunognaisda.animelib.domain.repository;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sunognaisda.animelib.domain.model.User;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends BaseMapper<User> {
    /**
     * Get data of User with the provided email address.
     *
     * @param emailAddress the email address of the user
     * @return all data of the user with the provided email address
     */
    @Select("SELECT * " +
            "FROM user " +
            "WHERE email_address = '${emailAddress}' AND is_deleted = 0;")
    Optional<User> getUserByEmail(String emailAddress);

    /**
     * Get data of all Users filtered by user role.
     *
     * @param role the role of the user (Admin, User)
     * @return data of all Users belonging to the chosen role
     */
    @Select("SELECT * " +
            "FROM user " +
            "WHERE role = '${role}'")
    List<User> getUsersByRole(String role);

    /**
     * Get data of all active Users (is_deleted = 0).
     *
     * @return data of all active users
     */
    @Select("SELECT * " +
            "FROM user " +
            "WHERE is_deleted = 0")
    List<User> getAllActiveUsers();
}
