package com.sunognaisda.animelib.domain.service;

import com.sunognaisda.animelib.domain.model.Watchlist;
import com.sunognaisda.animelib.domain.repository.WatchlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public interface WatchlistService {
    Watchlist addWatchlist(Watchlist wl);

}
