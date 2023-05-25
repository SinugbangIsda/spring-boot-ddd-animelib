package com.sunognaisda.animelib.impl.domain.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.github.database.rider.core.api.dataset.DataSet;
import com.sunognaisda.animelib.SpringBootBaseTest;
import com.sunognaisda.animelib.domain.model.Anime;
import com.sunognaisda.animelib.domain.repository.AnimeRepository;
import com.sunognaisda.animelib.domain.service.AnimeService;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataSet("db/datasets/anime.xml")
public class AnimeServiceImplTests extends SpringBootBaseTest {
    @Autowired
    private AnimeRepository animeRepository;

    @Autowired
    private AnimeService animeService;

    @Test
    @Order(1)
    void testAddAnime_EntryIsAddedSuccessfully() {
        // Set Test Values
        Anime testAnime = new Anime();
        testAnime.setTitle("Test Title");
        testAnime.setAltTitle("Test Alt");
        testAnime.setType("Type");
        testAnime.setEpisodes(1);
        testAnime.setStatus("Test Status");
        testAnime.setGenre("Test Genre");
        testAnime.setSynopsis("Test synopsis");
        testAnime.setImageURI("test");

        // Add Entry
        animeService.addAnime(testAnime);

        // Check if entry exists
        QueryWrapper<Anime> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("title", testAnime.getTitle());
        Optional<Anime> queriedAnime = Optional.ofNullable(animeRepository.selectOne(queryWrapper));

        assertThat(queriedAnime).isPresent();
    }

    @Test
    @Order(2)
    void testUpdateAnimeById_EntryIsUpdatedSuccessfully() {
        Anime testAnime = new Anime();
        testAnime.setId(5);
        testAnime.setTitle("Altered Title");
        testAnime.setAltTitle("Title Number 2");
        testAnime.setType("OVA");
        testAnime.setEpisodes(50);
        testAnime.setStatus("Completed");
        testAnime.setGenre("Action");
        testAnime.setSynopsis("This is an update test.");
        testAnime.setImageURI("test");

        animeService.updateAnimeById(testAnime);

        QueryWrapper<Anime> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("id", testAnime.getId());
        Optional<Anime> queriedAnime = Optional.ofNullable(animeRepository.selectOne(queryWrapper));

        assertThat(queriedAnime).isPresent();
    }

    @Test
    @Order(3)
    void testSoftDeleteAnimeById() {
        Anime testAnime = new Anime();
        testAnime.setId(6);
        animeService.softDeleteAnimeById(testAnime);

        animeRepository.getActiveAnimeById(6);
    }

//    @Test
//    @Order(3)
//    public void testUpdateAnimeById() {
//        Anime testAnime = new Anime();
//        testAnime.setId(5);
//        testAnime.setTitle("Alt Test Title #2");
//        testAnime.setAltTitle("Test Alt");
//        testAnime.setType("Type");
//        testAnime.setEpisodes(1);
//        testAnime.setStatus("Test Status");
//        testAnime.setGenre("Test Genre");
//        testAnime.setSynopsis("Test synopsis");
//
//        animeService.updateAnimeById(testAnime);
//    }

//    @Test
//    public void testDeleteAnimeById() {
//        Anime testAnime = new Anime();
//        testAnime.setId(4);
//
//        animeService.deleteAnimeById(testAnime);
//    }
}