package com.sunognaisda.animelib.application.rest;

import com.sunognaisda.animelib.domain.model.Watchlist;
import com.sunognaisda.animelib.domain.service.WatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/watchlist")
@CrossOrigin
public class WatchListController {
    @Autowired
    private WatchlistService watchlistService;

    // Add to Watchlist
    @PostMapping("add")
    public ResponseEntity<Watchlist> addWatchList(@RequestBody(required = true) Watchlist _wl) {
        try {
            Watchlist wl = watchlistService.addWatchlist(_wl);
            return new ResponseEntity<>(wl, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
