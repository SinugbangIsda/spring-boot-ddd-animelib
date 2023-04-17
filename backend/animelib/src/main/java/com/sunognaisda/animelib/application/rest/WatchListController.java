package com.sunognaisda.animelib.application.rest;

import com.sunognaisda.animelib.domain.model.Watchlist;
import com.sunognaisda.animelib.domain.service.WatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/watchlist")
@CrossOrigin
public class WatchListController {
    @Autowired
    private WatchlistService watchlistService;

    // Add to Watchlist
    @PostMapping("add")
    public void addToWatchlist(@RequestBody Watchlist watchlist) {
        watchlistService.addToWatchlist(watchlist);
    }
    
    // Get Watchlist
    @GetMapping("{user_id}")
    public List<Watchlist> getWatchlistByUserId(@PathVariable("user_id") long userId) {
        return watchlistService.getWatchlistByUserId(userId);
    }


    // Remove an anime from watchlist
    @DeleteMapping("{user_id}/{anime_id}")
    public void deleteAnimeFromWatchlist(@PathVariable("user_id") long userId, @PathVariable("anime_id") long animeId) {
        Watchlist watchlist = new Watchlist();
        watchlist.setUserId(userId);
        watchlist.setAnimeId(animeId);
        watchlistService.deleteAnimeFromWatchlist(watchlist);
    }

}
