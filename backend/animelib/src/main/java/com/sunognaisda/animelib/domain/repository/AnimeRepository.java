package com.sunognaisda.animelib.domain.repository;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sunognaisda.animelib.domain.model.Anime;
import org.springframework.stereotype.Repository;

@Repository
public interface AnimeRepository extends BaseMapper<Anime> {
}
