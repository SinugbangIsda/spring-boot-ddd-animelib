package com.sunognaisda.animelib.domain.repository;

import com.github.database.rider.core.api.dataset.DataSet;
import com.sunognaisda.animelib.SpringBootBaseTest;
import com.sunognaisda.animelib.domain.model.Anime;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataSet("db/datasets/anime.xml")
public class AnimeRepositoryTests extends SpringBootBaseTest {
    @Autowired
    private AnimeRepository animeRepository;

    @Test
    @Order(1)
    void testGetActiveAnimeById_WhenEntryExistsAndIsActive_ShouldReturnAnimeData() {
        Optional<Anime> queriedAnime = animeRepository.getActiveAnimeById(1);
        assertThat(queriedAnime).isPresent();
    }

    @Test
    @Order(2)
    void testGetActiveAnimeById_EntryDoesNotExist_ShouldReturnEmpty() {
        Optional<Anime> queriedAnime = animeRepository.getActiveAnimeById(0);
        assertThat(queriedAnime).isEmpty();
    }

    @Test
    @Order(3)
    void testGetActiveAnimeById_EntryIsNotActive_ShouldReturnEmpty() {
        Optional<Anime> queriedAnime = animeRepository.getActiveAnimeById(4);
        assertThat(queriedAnime).isEmpty();
    }

    @Test
    @Order(4)
    void testGetAllActiveAnime_WhenCalled_ShouldReturnAllAnimeWhereIsDeletedIsZero() {
        List<Anime> queriedAnime = animeRepository.getAllActiveAnime();
        assertThat(queriedAnime).isNotEmpty();
    }

    @Test
    @Order(5)
    void testGetAnimeByType_WhenTypeExists_ShouldReturnAllAnimeUnderChosenType() {
        String queriedType = "TV";

        List<Anime> queriedAnime = animeRepository.getAnimeByType(queriedType);

        assertThat(queriedAnime).isNotEmpty();
    }

    @Test
    @Order(6)
    void testGetAnimeByType_WhenTypeNotFound_ShouldReturnEmpty() {
        String queriedType = "None";

        List<Anime> queriedAnime = animeRepository.getAnimeByType(queriedType);

        assertThat(queriedAnime).isEmpty();
    }

    @Test
    @Order(7)
    void testGetAnimeByStatus_WhenValidStatus_ShouldReturnAllAnimeWithThatStatus() {
        String queriedStatus = "Completed";

        List<Anime> queriedAnime = animeRepository.getAnimeByStatus(queriedStatus);

        assertThat(queriedAnime).isNotEmpty();
    }

    @Test
    @Order(8)
    void testGetAnimeByStatus_WhenInvalidStatus_ShouldReturnEmpty() {
        String queriedStatus = "Incompleted";

        List<Anime> queriedAnime = animeRepository.getAnimeByStatus(queriedStatus);

        assertThat(queriedAnime).isEmpty();
    }

    @Test
    @Order(9)
    void testGetAnimeByGenre_WhenGenreExists_ShouldReturnAllAnimeUnderThatGenre() {
        String queriedGenre = "Action";

        List<Anime> queriedAnime = animeRepository.getAnimeByGenre(queriedGenre);

        assertThat(queriedAnime).isNotEmpty();
    }

    @Test
    @Order(10)
    void testGetAnimeByGenre_WhenGenreDoesNotExist_ShouldReturnEmpty() {
        String queriedGenre = "No Action";

        List<Anime> queriedAnime = animeRepository.getAnimeByGenre(queriedGenre);

        assertThat(queriedAnime).isEmpty();
    }
}
