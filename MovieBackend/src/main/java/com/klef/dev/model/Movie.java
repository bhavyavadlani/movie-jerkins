package com.klef.dev.model;

import jakarta.persistence.*;

@Entity
@Table(name = "movie_table")
public class Movie 
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "movie_id")
    private int id;

    @Column(name = "movie_title", length = 300, nullable = false)
    private String title;

    @Column(name = "movie_genre", length = 200, nullable = false)
    private String genre;

    @Column(name = "movie_duration", nullable = false)
    private int duration; // in minutes

    @Column(name = "movie_director", length = 300, nullable = false)
    private String director;

    // Getters & Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }

    public int getDuration() { return duration; }
    public void setDuration(int duration) { this.duration = duration; }

    public String getDirector() { return director; }
    public void setDirector(String director) { this.director = director; }
}
