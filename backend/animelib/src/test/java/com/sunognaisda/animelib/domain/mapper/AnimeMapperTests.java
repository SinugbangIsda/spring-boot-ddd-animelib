package com.sunognaisda.animelib.domain.mapper;

import com.sunognaisda.animelib.domain.model.Anime;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class AnimeMapperTests {
    @Autowired
    private AnimeMapper animeMapper;

    @Test
    public void testSelectList() {
        List<Anime> testList = animeMapper.selectList(null);
        testList.forEach(System.out::println);
    }

    @Test
    public void testInsert() {
        Anime testAnime = new Anime();
        testAnime.setId(6);
        testAnime.setTitle("Test Title");
        testAnime.setAltTitle("Test Alt");
        testAnime.setType("Type");
        testAnime.setEpisodes(1);
        testAnime.setStatus("Test Status");
        testAnime.setGenre("Test Genre");
        testAnime.setSynopsis("Test synopsis");
        testAnime.setImageURI("test");

        System.out.println(testAnime);

        animeMapper.insert(testAnime);
    }
}
