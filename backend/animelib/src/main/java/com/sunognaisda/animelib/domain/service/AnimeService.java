package com.sunognaisda.animelib.domain.service;

import com.sunognaisda.animelib.domain.model.Anime;
import org.springframework.stereotype.Service;

@Service
public interface AnimeService {
    /**
     * Adds the new Anime entry into the database.
     *
     * @param anime contains all data of an Anime
     */
    void addAnime(Anime anime);

    /**
     * Updates the information of the Anime entry with the provided ID.
     *
     * @param anime contains all data of an Anime
     */
    void updateAnimeById(Anime anime);

    /**
     * Soft deletes the data of an Anime entry by changing `is_deleted` to 1.
     *
     * @param anime contains all data of an Anime
     */
    void softDeleteAnimeById(Anime anime);
}
