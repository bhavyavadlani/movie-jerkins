package com.klef.dev.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.klef.dev.model.Movie;
import com.klef.dev.repository.MovieRepository;

@Service
public class MovieServiceImpl implements MovieService
{
    @Autowired
    private MovieRepository movieRepository;

    @Override
    public String addMovie(Movie movie)
    {
        movieRepository.save(movie);
        return "Movie Added Successfully";
    }

    @Override
    public String deleteMovie(int mid)
    {
        Optional<Movie> movie = movieRepository.findById(mid);
        if (movie.isPresent()) {
            movieRepository.deleteById(mid);
            return "Movie Deleted Successfully";
        } else {
            return "Movie ID Not Found";
        }
    }

    @Override
    public List<Movie> viewAllMovies()
    {
        return movieRepository.findAll();
    }

    @Override
    public String updateMovie(Movie movie)
    {
        movieRepository.save(movie);
        return "Movie Updated Successfully";
    }

    @Override
    public Movie getMovieById(int mid)
    {
        return movieRepository.findById(mid).orElse(null);
    }
}
