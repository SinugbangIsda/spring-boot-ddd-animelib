package com.sunognaisda.animelib.domain.service;

import com.sunognaisda.animelib.domain.model.Anime;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AnimeService {
    void addAnime(Anime anime);

    List<Anime> getAllAnime();

    Anime getAnimeById(long animeId);

    void updateAnimeById(Anime anime);

    void deleteAnimeById(long animeId);
}
