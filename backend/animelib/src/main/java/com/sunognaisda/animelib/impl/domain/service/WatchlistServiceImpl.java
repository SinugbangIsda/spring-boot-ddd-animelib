package com.sunognaisda.animelib.impl.domain.service;

import com.sunognaisda.animelib.domain.repository.WatchlistRepository;
import com.sunognaisda.animelib.domain.model.Watchlist;
import com.sunognaisda.animelib.domain.service.WatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WatchlistServiceImpl implements WatchlistService {
    @Autowired
    private WatchlistRepository watchlistRepository;

    @Override
    public void addToWatchlist(Watchlist watchlist) {
        /* Features to add:
        - Check if entry is already in watchlist.
        - If entry is already added to watchlist, check if `is_deleted` is set to 0 or 1.
         */
        watchlistRepository.insert(watchlist);
    }

    @Override
    public void softDeleteAnimeFromWatchlist(Watchlist watchlist) {
        watchlist.setDeleted(true);
        watchlistRepository.updateByMultiId(watchlist);
    }
}
