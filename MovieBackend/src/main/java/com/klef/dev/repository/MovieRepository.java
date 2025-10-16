package com.klef.dev.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.klef.dev.model.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {
}
