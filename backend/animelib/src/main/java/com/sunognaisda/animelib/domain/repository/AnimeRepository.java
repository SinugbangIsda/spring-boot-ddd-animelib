package com.sunognaisda.animelib.domain.repository;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sunognaisda.animelib.domain.model.Anime;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AnimeRepository extends BaseMapper<Anime> {
    /**
     * Get all data of the selected active Anime entry by Anime ID.
     *
     * @param id the Anime ID
     * @return the data of the anime entry
     */
    @Select("SELECT * " +
            "FROM anime " +
            "WHERE id = ${id} AND is_deleted = 0;")
    Optional<Anime> getActiveAnimeById(long id);

    /**
     * Get all active Anime entries in the database
     *
     * @return all active anime entries
     */
    @Select("SELECT * " +
            "FROM anime " +
            "WHERE is_deleted = 0;")
    List<Anime> getAllActiveAnime();

    /**
     * Get the data of all Animes filtered by type.
     *
     * @param type the type of Anime (TV, OVA, Movie)
     * @return data of all Anime of the chosen type
     */
    @Select("SELECT * " +
            "FROM anime " +
            "WHERE type = '${type}' AND is_deleted = 0;")
    List<Anime> getAnimeByType(String type);

    /**
     * Get the data of all Animes filtered by status.
     *
     * @param status the status of an Anime (Ongoing, Completed)
     * @return data of all Anime with the chosen status
     */
    @Select("SELECT * " +
            "FROM anime " +
            "WHERE status = '${status}' AND is_deleted = 0;")
    List<Anime> getAnimeByStatus(String status);

    /**
     * Get the data of all Animes filtered by genre.
     *
     * @param genre the genre of an Anime (Action, Fantasy, Slice of Life, etc.)
     * @return the data of all Anime under the chosen genre
     */
    @Select("SELECT * " +
            "FROM anime " +
            "WHERE genre = '${genre}' AND is_deleted = 0;")
    List<Anime> getAnimeByGenre(String genre);
}
