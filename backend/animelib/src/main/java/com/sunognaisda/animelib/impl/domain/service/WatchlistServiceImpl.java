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

    @Autowired
    private AnimeMapper animeMapper;

    @Override
    public void addToWatchlist(Watchlist watchlist) {
        watchlistMapper.insert(watchlist);
    }

    @Override
    public List<Anime> getWatchlistByUserId(long userId) {
        // get all watchlist entries
        QueryWrapper<Watchlist> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id", userId);
        List<Watchlist> watchlists = watchlistMapper.selectList(queryWrapper);

        // store all animeIds into a single list
        List<Long> animeIdList = new ArrayList<>();
        for (Watchlist watchlist : watchlists) {
            animeIdList.add(watchlist.getAnimeId());
        }

        // query to get all anime information using the list of animeIds
        QueryWrapper<Anime> animeQueryWrapper = new QueryWrapper<>();
        animeQueryWrapper.in("id", animeIdList);
        return animeMapper.selectList(animeQueryWrapper);
    }

    @Override
    public void deleteAnimeFromWatchlist(Watchlist watchlist) {
        watchlistMapper.deleteByMultiId(watchlist);
    }
}
