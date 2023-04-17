package com.sunognaisda.animelib.domain.service;

import com.sunognaisda.animelib.domain.model.Watchlist;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface WatchlistService {
    void addToWatchlist(Watchlist watchlist);

    List<Watchlist> getWatchlistByUserId(long userId);

    void deleteAnimeFromWatchlist(Watchlist watchlist);


}
