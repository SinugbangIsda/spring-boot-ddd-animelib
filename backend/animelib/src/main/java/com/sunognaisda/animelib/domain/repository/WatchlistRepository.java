package com.sunognaisda.animelib.domain.repository;

import com.sunognaisda.animelib.domain.model.Watchlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WatchlistRepository extends JpaRepository<Watchlist, String> {
}
