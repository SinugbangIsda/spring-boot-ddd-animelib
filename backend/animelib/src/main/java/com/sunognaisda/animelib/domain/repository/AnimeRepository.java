package com.sunognaisda.animelib.domain.repository;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sunognaisda.animelib.domain.model.Anime;
import com.sunognaisda.animelib.domain.model.Watchlist;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnimeRepository extends BaseMapper<Anime> {
}
