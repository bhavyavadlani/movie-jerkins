package com.klef.dev.service;

import java.util.List;
import com.klef.dev.model.Movie;

public interface MovieService
{
    public String addMovie(Movie movie);
    public String deleteMovie(int mid);
    public List<Movie> viewAllMovies();
    public String updateMovie(Movie movie);
    public Movie getMovieById(int mid);
}
