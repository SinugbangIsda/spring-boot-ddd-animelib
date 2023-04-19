package com.sunognaisda.animelib.application.dto.watchlist;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WatchlistCreateRequest {
    private long userId;
    private long animeId;
}
