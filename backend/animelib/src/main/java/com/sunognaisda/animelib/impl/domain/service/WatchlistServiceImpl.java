package com.sunognaisda.animelib.impl.domain.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.sunognaisda.animelib.domain.mapper.AnimeMapper;
import com.sunognaisda.animelib.domain.mapper.WatchlistMapper;
import com.sunognaisda.animelib.domain.model.Anime;
import com.sunognaisda.animelib.domain.model.Watchlist;
import com.sunognaisda.animelib.domain.service.WatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WatchlistServiceImpl implements WatchlistService {
    @Autowired
    private WatchlistMapper watchlistMapper;

    @Override
    public void addToWatchlist(Watchlist watchlist) {
        watchlistMapper.insert(watchlist);
    }

    @Override
    public List<Anime> getWatchlistByUserId(long userId) {
        return watchlistMapper.getAllAnimeInWatchlist(userId);
    }

    @Override
    public void deleteAnimeFromWatchlist(Watchlist watchlist) {
        watchlistMapper.deleteByMultiId(watchlist);
    }
}
