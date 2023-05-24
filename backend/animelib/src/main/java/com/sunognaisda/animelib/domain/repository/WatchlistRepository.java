package com.sunognaisda.animelib.domain.repository;

import com.github.jeffreyning.mybatisplus.base.MppBaseMapper;
import com.sunognaisda.animelib.domain.model.Anime;
import com.sunognaisda.animelib.domain.model.Watchlist;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WatchlistRepository extends MppBaseMapper<Watchlist> {
    @Select("SELECT anime.* " +
            "FROM watchlist " +
            "INNER JOIN anime ON watchlist.anime_id = anime.id " +
            "WHERE watchlist.user_id = ${id} AND watchlist.is_deleted = 0;")
    List<Anime> getWatchlistByUserId(long id);
}
