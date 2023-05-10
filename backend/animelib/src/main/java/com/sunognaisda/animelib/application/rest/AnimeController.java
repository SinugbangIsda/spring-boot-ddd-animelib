package com.sunognaisda.animelib.application.rest;

import com.sunognaisda.animelib.domain.model.Anime;
import com.sunognaisda.animelib.domain.model.Watchlist;
import com.sunognaisda.animelib.domain.repository.AnimeRepository;
import com.sunognaisda.animelib.domain.repository.WatchlistRepository;
import com.sunognaisda.animelib.domain.service.AnimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/anime")
@CrossOrigin
public class AnimeController {
    @Autowired
    private AnimeRepository animeRepository;

    @Autowired
    private AnimeService animeService;

    @Autowired
    private WatchlistRepository watchlistRepository;

    @PostMapping("add")
    public void addAnime(@RequestBody Anime anime) {
        animeService.addAnime(anime);
    }

    @GetMapping("")
    public List<Anime> getAllAnime() {
        return animeRepository.selectList(null);
    }

    @GetMapping("{anime_id}")
    public Anime getAnimeById(@PathVariable("anime_id") long animeId) {
        return animeRepository.selectById(animeId);
    }

    // Check if anime exists in watchlist.
    @GetMapping("{anime_id}/check/{user_id}")
    public boolean checkIfAnimeInWatchlist(@PathVariable("anime_id") long animeId, @PathVariable("user_id") long userId) {
        Watchlist watchlist = new Watchlist();
        watchlist.setUserId(userId);
        watchlist.setAnimeId(animeId);
        return watchlist.equals(watchlistRepository.selectByMultiId(watchlist));
    }

    @PutMapping("{anime_id}")
    public void updateAnimeById(@PathVariable("anime_id") long animeId, @RequestBody Anime anime) {
        anime.setId(animeId);
        animeService.updateAnimeById(anime);
    }

    @PutMapping("sd/{anime_id}")
    public void deleteAnimeById(@PathVariable("anime_id") long animeId) {
        Anime anime = new Anime();
        anime.setId(animeId);
        animeService.deleteAnimeById(anime);
    }
}
