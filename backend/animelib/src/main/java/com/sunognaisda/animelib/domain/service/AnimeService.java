package com.sunognaisda.animelib.domain.service;

import com.sunognaisda.animelib.domain.model.Anime;
import org.springframework.stereotype.Service;

@Service
public interface AnimeService {
    void addAnime(Anime anime);

    void updateAnimeById(Anime anime);

    void softDeleteAnimeById(Anime anime);
}
