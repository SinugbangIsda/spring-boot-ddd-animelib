package com.sunognaisda.animelib.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Anime {
    private String id;
    private String title;
    private String type;
    private Integer episodes;
    private String genre;
    private String synopsis;
    private String image_uri;
}
