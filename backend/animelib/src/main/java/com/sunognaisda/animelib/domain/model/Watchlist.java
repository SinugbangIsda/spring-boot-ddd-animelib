package com.sunognaisda.animelib.domain.model;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.github.jeffreyning.mybatisplus.anno.MppMultiId;
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
    @MppMultiId
    @TableId("user_id")
    private long userId;

    @MppMultiId
    @TableField("anime_id")
    private long animeId;
}


