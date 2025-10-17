package com.klef.dev.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.klef.dev.model.Movie;
import com.klef.dev.service.MovieService;

@RestController
@RequestMapping("/movieapi")
@CrossOrigin("*")
public class MovieController
{
    @Autowired
    private MovieService movieService;

    @GetMapping("/")
    public String home() {
        return "Welcome to Movie Backend API";
    }

    @PostMapping("/add")
    public ResponseEntity<String> addMovie(@RequestBody Movie movie)
    {
        try {
            String result = movieService.addMovie(movie);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to Add Movie");
        }
    }

    @DeleteMapping("/delete/{mid}")
    public ResponseEntity<String> deleteMovie(@PathVariable int mid)
    {
        try {
            String result = movieService.deleteMovie(mid);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to Delete Movie");
        }
    }

    @GetMapping("/viewall")
    public ResponseEntity<List<Movie>> viewAllMovies()
    {
        List<Movie> movies = movieService.viewAllMovies();
        return ResponseEntity.ok(movies);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateMovie(@RequestBody Movie movie)
    {
        try {
            String result = movieService.updateMovie(movie);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to Update Movie");
        }
    }

    @GetMapping("/viewbyid/{mid}")
    public ResponseEntity<?> getMovieById(@PathVariable int mid)
    {
        try {
            Movie movie = movieService.getMovieById(mid);
            if (movie != null)
                return ResponseEntity.ok(movie);
            else
                return ResponseEntity.status(404).body("Movie Not Found");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to Fetch Movie");
        }
    }
}
