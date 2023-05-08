package com.sunognaisda.animelib.impl.domain.service;

import com.sunognaisda.animelib.domain.model.Anime;
import com.sunognaisda.animelib.domain.service.AnimeService;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class AnimeServiceImplTests {
    @Autowired
    private AnimeService animeService;

    @Test
    @Order(1)
    public void testGetAllAnime() {
        List<Anime> testList = animeService.getAllAnime();
        testList.forEach(System.out::println);
    }

    @Test
    @Order(2)
    public void testAddAnime() {
        Anime testAnime = new Anime();
        testAnime.setId(5);
        testAnime.setTitle("Test Title");
        testAnime.setAltTitle("Test Alt");
        testAnime.setType("Type");
        testAnime.setEpisodes(1);
        testAnime.setStatus("Test Status");
        testAnime.setGenre("Test Genre");
        testAnime.setSynopsis("Test synopsis");
        testAnime.setImageURI("test");

        System.out.println(testAnime);

        animeService.addAnime(testAnime);
    }

    @Test
    @Order(3)
    public void testUpdateAnimeById() {
        Anime testAnime = new Anime();
        testAnime.setId(5);
        testAnime.setTitle("Alt Test Title #2");
        testAnime.setAltTitle("Test Alt");
        testAnime.setType("Type");
        testAnime.setEpisodes(1);
        testAnime.setStatus("Test Status");
        testAnime.setGenre("Test Genre");
        testAnime.setSynopsis("Test synopsis");

        animeService.updateAnimeById(testAnime);
    }

    @Test
    public void testDeleteAnimeById() {
        Anime testAnime = new Anime();
        testAnime.setId(4);

        animeService.deleteAnimeById(testAnime);
    }
}
