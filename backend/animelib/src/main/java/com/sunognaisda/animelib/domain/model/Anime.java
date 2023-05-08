package com.sunognaisda.animelib.domain.model;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@TableName("anime")
public class Anime {
    @TableId(type = IdType.ASSIGN_ID)
    private long id;

    @TableField("title")
    private String title;

    @TableField("alt_title")
    private String altTitle;

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

    @TableField("image_uri")
    private String imageURI;

    @TableField("created_at")
    private LocalDateTime createdAt;

    @TableField("updated_at")
    private LocalDateTime updatedAt;

    @TableField("is_deleted")
    private boolean isDeleted;

}
