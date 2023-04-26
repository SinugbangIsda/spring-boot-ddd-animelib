package com.sunognaisda.animelib.impl.domain.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.sunognaisda.animelib.domain.mapper.AnimeMapper;
import com.sunognaisda.animelib.domain.mapper.WatchlistMapper;
import com.sunognaisda.animelib.domain.model.Anime;
import com.sunognaisda.animelib.domain.model.Watchlist;
import com.sunognaisda.animelib.domain.service.AnimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnimeServiceImpl implements AnimeService {

    @Autowired
    private AnimeMapper animeMapper;
    @Autowired
    private WatchlistMapper watchlistMapper;

    @Override
    public void addAnime(Anime anime) {
        animeMapper.insert(anime);
    }

    @Override
    public List<Anime> getAllAnime() {
        return animeMapper.selectList(null);
    }

    @Override
    public Anime getAnimeById(long animeId) {
        return animeMapper.selectById(animeId);
    }


    @Override
    public void updateAnimeById(Anime anime) {
        animeMapper.updateById(anime);
    }

    @Override
    public void deleteAnimeById(long animeId) {
        QueryWrapper<Watchlist> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("anime_id", animeId);
        watchlistMapper.delete(queryWrapper);
        animeMapper.deleteById(animeId);
    }

    @Override
    public boolean checkIfAnimeInWatchlist(Watchlist watchlist) {
        return watchlist.equals(watchlistMapper.selectByMultiId(watchlist));

    }

}
