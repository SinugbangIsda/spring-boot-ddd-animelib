package com.sunognaisda.animelib.domain.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sunognaisda.animelib.domain.model.Anime;
import org.springframework.stereotype.Repository;

@Repository
public interface AnimeMapper extends BaseMapper<Anime> {
}
