package com.sunognaisda.animelib.impl.domain.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.sunognaisda.animelib.domain.repository.AnimeRepository;
import com.sunognaisda.animelib.domain.repository.WatchlistRepository;
import com.sunognaisda.animelib.domain.model.Anime;
import com.sunognaisda.animelib.domain.model.Watchlist;
import com.sunognaisda.animelib.domain.service.AnimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnimeServiceImpl implements AnimeService {

    @Autowired
    private AnimeRepository animeRepository;

    @Autowired
    private WatchlistRepository watchlistRepository;

    @Override
    public void deleteAnimeById(Anime anime) {
        QueryWrapper<Watchlist> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("anime_id", anime.getId());
        watchlistRepository.delete(queryWrapper);
        anime.setDeleted(true);
        animeRepository.updateById(anime);
    }
}
