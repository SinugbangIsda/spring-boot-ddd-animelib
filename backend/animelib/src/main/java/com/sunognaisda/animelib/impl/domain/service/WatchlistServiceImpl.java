package com.sunognaisda.animelib.impl.domain.service;

import com.sunognaisda.animelib.domain.model.Watchlist;
import com.sunognaisda.animelib.domain.repository.WatchlistRepository;
import com.sunognaisda.animelib.domain.service.WatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class WatchlistServiceImpl implements WatchlistService {
    @Override
    public Watchlist addWatchlist(Watchlist wl) {
        wl.setId(UUID.randomUUID().toString());
        return null;
    }
}
