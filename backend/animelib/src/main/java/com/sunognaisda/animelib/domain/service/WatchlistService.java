package com.sunognaisda.animelib.domain.service;

import com.sunognaisda.animelib.domain.model.Watchlist;
import org.springframework.stereotype.Service;

@Service
public interface WatchlistService {
    /**
     * Add anime to user's watchlist
     *
     * @param watchlist requires a User ID and an Anime ID.
     */
    void addToWatchlist(Watchlist watchlist);

    /**
     * Soft Delete watchlist entry by chaning `is_deleted` to 1
     *
     * @param watchlist requires a User ID and an Anime ID
     */
    void softDeleteAnimeFromWatchlist(Watchlist watchlist);


}
