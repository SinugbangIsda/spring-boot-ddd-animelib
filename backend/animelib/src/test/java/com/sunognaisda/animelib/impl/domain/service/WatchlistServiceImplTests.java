package com.sunognaisda.animelib.impl.domain.service;

import com.github.database.rider.core.api.dataset.DataSet;
import com.sunognaisda.animelib.SpringBootBaseTest;
import com.sunognaisda.animelib.domain.model.Anime;
import com.sunognaisda.animelib.domain.model.Watchlist;
import com.sunognaisda.animelib.domain.repository.AnimeRepository;
import com.sunognaisda.animelib.domain.repository.WatchlistRepository;
import com.sunognaisda.animelib.domain.service.WatchlistService;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DataSet("db/datasets/watchlist.xml")
public class WatchlistServiceImplTests extends SpringBootBaseTest {
    @Autowired
    WatchlistRepository watchlistRepository;

    @Autowired
    WatchlistService watchlistService;

    @Autowired
    AnimeRepository animeRepository;

    @Test
    @Order(1)
    void testAddToWatchlist_WhenAnimeExists_ShouldAddToWatchlistSuccessfully() {
        Watchlist testWatchlist = new Watchlist();
        testWatchlist.setUserId(1);
        testWatchlist.setAnimeId(4);
        watchlistService.addToWatchlist(testWatchlist);

        Optional<Watchlist> queriedWatchlist = watchlistRepository.selectActiveWatchlistEntryByMultiId(testWatchlist.getUserId(), testWatchlist.getAnimeId());
        assertThat(queriedWatchlist).isPresent();
    }

    @Test
    @Order(2)
    void testAddToWatchlist_WhenEntryIsADuplicate_ShouldThrowException() {
        Watchlist testWatchlist = new Watchlist();
        testWatchlist.setUserId(1);
        testWatchlist.setAnimeId(3);

        assertThrows(DuplicateKeyException.class, () -> {watchlistService.addToWatchlist(testWatchlist);}, "DuplicateKeyException was expected");
    }

    @Test
    @Order(2)
    void testAddToWatchlist_WhenAnimeDoesNotExist_ShouldReturnEmpty() {
        Watchlist testWatchlist = new Watchlist();
        testWatchlist.setUserId(1);
        testWatchlist.setAnimeId(5);

        // Do a query checking if anime entry is valid
        Optional<Anime> queryAnime = animeRepository.getActiveAnimeById(testWatchlist.getAnimeId());

        watchlistService.addToWatchlist(testWatchlist);

        Optional<Watchlist> queriedWatchlist = watchlistRepository.selectActiveWatchlistEntryByMultiId(testWatchlist.getUserId(), testWatchlist.getAnimeId());
        assertThat(queriedWatchlist).isEmpty();
    }

    @Test
    @Order(3)
    void testSoftDeleteAnimeFromWatchlist_WhenEntryExists_ShouldUpdateEntryAsDeleted() {
        // Test values
        Watchlist testWatchlist = new Watchlist();
        testWatchlist.setUserId(1);
        testWatchlist.setAnimeId(2);

        // Check if entry exists
        Optional<Watchlist> checkWatchlist = watchlistRepository.selectActiveWatchlistEntryByMultiId(testWatchlist.getUserId(), testWatchlist.getAnimeId());
        assertThat(checkWatchlist).isPresent();

        // Soft Delete (is_deleted = 1)
        watchlistService.softDeleteAnimeFromWatchlist(testWatchlist);

        // Check if entry cannot be found
        Optional<Watchlist> queriedWatchlist = watchlistRepository.selectActiveWatchlistEntryByMultiId(testWatchlist.getUserId(), testWatchlist.getAnimeId());
        assertThat(queriedWatchlist).isEmpty();
    }
}
