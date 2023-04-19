package com.sunognaisda.animelib.application.dto.anime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnimeUpdateRequest {
    private long id;
    private String title;
    private String altTitle;
    private String type;
    private Integer episodes;
    private String status;
    private String genre;
    private String synopsis;
    private String imageURI;
}