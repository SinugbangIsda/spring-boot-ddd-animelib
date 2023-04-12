package com.sunognaisda.animelib.application.rest;

import com.sunognaisda.animelib.domain.model.Anime;
import com.sunognaisda.animelib.domain.service.AnimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/anime")
@CrossOrigin
public class AnimeController {
    @Autowired
    private AnimeService animeService;
}
