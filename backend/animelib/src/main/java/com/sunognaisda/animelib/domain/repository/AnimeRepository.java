package com.sunognaisda.animelib.domain.repository;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sunognaisda.animelib.domain.model.Anime;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AnimeRepository extends BaseMapper<Anime> {
    @Select("SELECT * " +
            "FROM anime " +
            "WHERE id = ${id} AND is_deleted = 0;")
    Optional<Anime> getActiveAnimeById(long id);

    @Select("SELECT * " +
            "FROM anime " +
            "WHERE is_deleted = 0;")
    List<Anime> getAllActiveAnime();

    @Select("SELECT * " +
            "FROM anime " +
            "WHERE type = '${type}' AND is_deleted = 0;")
    List<Anime> getAnimeByType(String type);

    @Select("SELECT * " +
            "FROM anime " +
            "WHERE status = '${status}' AND is_deleted = 0;")
    List<Anime> getAnimeByStatus(String status);

    @Select("SELECT * " +
            "FROM anime " +
            "WHERE genre = '${genre}' AND is_deleted = 0;")
    List<Anime> getAnimeByGenre(String genre);
}
