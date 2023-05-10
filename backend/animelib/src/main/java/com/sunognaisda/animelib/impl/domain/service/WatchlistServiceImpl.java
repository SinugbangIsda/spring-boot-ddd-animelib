package com.sunognaisda.animelib.impl.domain.service;

import com.sunognaisda.animelib.domain.repository.WatchlistRepository;
import com.sunognaisda.animelib.domain.model.Anime;
import com.sunognaisda.animelib.domain.model.Watchlist;
import com.sunognaisda.animelib.domain.service.WatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WatchlistServiceImpl implements WatchlistService {
    @Autowired
    private WatchlistRepository watchlistRepository;

    @Override
    public void addToWatchlist(Watchlist watchlist) {
        watchlistRepository.insert(watchlist);
    }

    @Override
    public List<Anime> getWatchlistByUserId(long userId) {
        return watchlistRepository.getAllAnimeInWatchlist(userId);
    }

    @Override
    public void deleteAnimeFromWatchlist(Watchlist watchlist) {
        watchlistRepository.deleteByMultiId(watchlist);
    }
}
