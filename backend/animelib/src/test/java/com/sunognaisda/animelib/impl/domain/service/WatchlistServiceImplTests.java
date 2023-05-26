package com.sunognaisda.animelib.impl.domain.service;

import com.github.database.rider.core.api.dataset.DataSet;
import com.sunognaisda.animelib.SpringBootBaseTest;
import com.sunognaisda.animelib.domain.model.Watchlist;
import com.sunognaisda.animelib.domain.repository.WatchlistRepository;
import com.sunognaisda.animelib.domain.service.WatchlistService;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataSet("db/datasets/watchlist.xml")
public class WatchlistServiceImplTests extends SpringBootBaseTest {
    @Autowired
    WatchlistRepository watchlistRepository;

    @Autowired
    WatchlistService watchlistService;

    @Test
    @Order(1)
    void testAddToWatchlist_WhenAnimeExists_ShouldAddToWatchlistSuccessfully() {
        Watchlist testWatchlist = new Watchlist();
        testWatchlist.setUserId(1);
        testWatchlist.setAnimeId(4);
        watchlistService.addToWatchlist(testWatchlist);

        Optional<Watchlist> queriedWatchlist = watchlistRepository.selectUserEntryByMultiId(testWatchlist.getUserId(), testWatchlist.getAnimeId());
        assertThat(queriedWatchlist).isPresent();
    }

//    @Test
//    @Order(2)
//    void testAddToWatchlist_EntryDuplication() {
//        Watchlist testWatchlist = new Watchlist();
//        testWatchlist.setUserId(1);
//        testWatchlist.setAnimeId(4);
//        watchlistService.addToWatchlist(testWatchlist);
//
//        Optional<Watchlist> queriedWatchlist = watchlistRepository.selectUserEntryByMultiId(testWatchlist.getUserId(), testWatchlist.getAnimeId());
//        assertThat(queriedWatchlist).isPresent();
//    }

//    @Test
//    @Order(2)
//    void testAddToWatchlist_WhenAnimeDoesNotExist() {
//        Watchlist testWatchlist = new Watchlist();
//        testWatchlist.setUserId(1);
//        testWatchlist.setAnimeId(5);
//
//        // Do a query checking if anime entry is valid
//
//        watchlistService.addToWatchlist(testWatchlist);
//
//        Optional<Watchlist> queriedWatchlist = watchlistRepository.selectUserEntryByMultiId(testWatchlist.getUserId(), testWatchlist.getAnimeId());
//        assertThat(queriedWatchlist).isEmpty();
//    }

    @Test
    @Order(3)
    void testSoftDeleteAnimeFromWatchlist() {
        // Test values
        Watchlist testWatchlist = new Watchlist();
        testWatchlist.setUserId(1);
        testWatchlist.setAnimeId(4);

//        // Check if entry exists
//        Optional<Watchlist> checkWatchlist = watchlistRepository.selectUserEntryByMultiId(testWatchlist.getUserId(), testWatchlist.getAnimeId());
//        assertThat(checkWatchlist).isPresent();

        // Soft Delete
        watchlistService.softDeleteAnimeFromWatchlist(testWatchlist);

        // Check if entry cannot be found
        Optional<Watchlist> queriedWatchlist = watchlistRepository.selectUserEntryByMultiId(testWatchlist.getUserId(), testWatchlist.getAnimeId());
        assertThat(queriedWatchlist).isEmpty();
    }
}
