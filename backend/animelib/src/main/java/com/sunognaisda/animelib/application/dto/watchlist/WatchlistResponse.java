package com.sunognaisda.animelib.application.dto.watchlist;

import com.sunognaisda.animelib.application.dto.ErrorContent;
import com.sunognaisda.animelib.domain.model.Watchlist;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WatchlistResponse {
    private Watchlist watchlist;
    private ErrorContent errorContent;
}
