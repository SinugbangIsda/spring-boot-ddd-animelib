package com.sunognaisda.animelib.domain.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.github.jeffreyning.mybatisplus.base.MppBaseMapper;
import com.sunognaisda.animelib.domain.model.Watchlist;
import org.springframework.stereotype.Repository;

@Repository
public interface WatchlistMapper extends MppBaseMapper<Watchlist> {
}
