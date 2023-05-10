package com.sunognaisda.animelib.domain.repository;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sunognaisda.animelib.domain.model.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends BaseMapper<User> {
}
