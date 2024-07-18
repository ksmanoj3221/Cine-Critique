package com.manoj.movies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
//@RequestMapping("/api/v1/reviews")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @PostMapping("/api/v1/reviews")
    public ResponseEntity<Review> createReview(@RequestBody Map<String, String> payload) {
        return ResponseEntity.ok(reviewService.createReview(payload.get("reviewBody"), payload.get("imdbId")));
    }

    @GetMapping("/api/v1/reviews/{imdbId}")
    public ResponseEntity<List<Review>> getReviewsByMovieId(@PathVariable String imdbId) {
        List<Review> reviews = reviewService.getReviewsByImdbId(imdbId);
        return ResponseEntity.ok(reviews);
    }
}
