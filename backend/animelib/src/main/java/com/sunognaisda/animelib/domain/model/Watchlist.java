package com.sunognaisda.animelib.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "watchlist")
public class Watchlist {
    @Id
    private String id;

    @Column(name = "user_id", nullable = false)
    private Integer user_id;

    @Column(name = "anime_id", nullable = false)
    private Integer anime_id;
}


