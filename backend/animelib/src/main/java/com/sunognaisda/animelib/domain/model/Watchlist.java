package com.sunognaisda.animelib.domain.model;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@TableName("watchlist")
public class Watchlist {
    @TableId("user_id")
    private long user_id;

    @TableId("anime_id")
    private long anime_id;
}


