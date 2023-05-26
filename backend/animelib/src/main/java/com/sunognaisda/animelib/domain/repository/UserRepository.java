package com.sunognaisda.animelib.domain.repository;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sunognaisda.animelib.domain.model.User;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends BaseMapper<User> {
    @Select("SELECT * " +
            "FROM user " +
            "WHERE email_address = '${emailAddress}' AND is_deleted = 0;")
    Optional<User> getUserByEmail(String emailAddress);

    @Select("SELECT * " +
            "FROM user " +
            "WHERE role = '${role}'")
    List<User> getUsersByRole(String role);

    @Select("SELECT * " +
            "FROM user " +
            "WHERE is_deleted = 0")
    List<User> getAllActiveUsers();
}
