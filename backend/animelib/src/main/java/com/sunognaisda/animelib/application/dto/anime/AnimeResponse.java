package com.sunognaisda.animelib.application.dto.anime;

import com.sunognaisda.animelib.application.dto.ErrorContent;
import com.sunognaisda.animelib.domain.model.Anime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnimeResponse {
    private Anime anime;
    private ErrorContent errorContent;
}
