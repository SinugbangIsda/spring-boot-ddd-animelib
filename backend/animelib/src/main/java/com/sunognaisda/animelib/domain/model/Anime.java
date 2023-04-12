package com.sunognaisda.animelib.domain.model;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
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
@TableName("anime")
public class Anime {
    @TableId(type = IdType.ASSIGN_UUID)
    private String id;

    @TableField("title")
    private String title;

    @TableField("type")
    private String type;

    @TableField("episodes")
    private Integer episodes;

    @TableField("status")
    private String status;

    @TableField("genre")
    private String genre;

    @TableField("synopsis")
    private String synopsis;

    @TableField("image_url")
    private String image_uri;
}
