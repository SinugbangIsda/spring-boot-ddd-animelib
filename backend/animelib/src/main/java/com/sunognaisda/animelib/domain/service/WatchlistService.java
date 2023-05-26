package com.sunognaisda.animelib.domain.service;

import com.sunognaisda.animelib.domain.model.Watchlist;
import org.springframework.stereotype.Service;

@Service
public interface WatchlistService {
    void addToWatchlist(Watchlist watchlist);
    void softDeleteAnimeFromWatchlist(Watchlist watchlist);


}
