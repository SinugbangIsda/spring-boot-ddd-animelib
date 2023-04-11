package com.sunognaisda.animelib.domain.repository;

import com.sunognaisda.animelib.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String>
{
}
