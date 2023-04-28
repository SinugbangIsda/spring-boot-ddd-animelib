package com.sunognaisda.animelib.domain.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.github.jeffreyning.mybatisplus.base.MppBaseMapper;
import com.sunognaisda.animelib.domain.model.Anime;
import com.sunognaisda.animelib.domain.model.Watchlist;
import org.apache.ibatis.annotations.ResultMap;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WatchlistMapper extends MppBaseMapper<Watchlist> {
    @Select("SELECT anime.* " +
            "FROM watchlist " +
            "INNER JOIN anime ON watchlist.anime_id = anime.id " +
            "WHERE user_id = ${id};")
    List<Anime> getAllAnimeInWatchlist(long id);
}
