package com.manoj.movies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Review createReview(String reviewBody, String imdbId) {
        Review review = reviewRepository.insert(new Review(reviewBody, LocalDateTime.now(), LocalDateTime.now()));

        Query movieQuery = new Query(Criteria.where("imdbId").is(imdbId));
        Movie movie = mongoTemplate.findOne(movieQuery, Movie.class);

        if (movie != null) {
            Update update = new Update().push("reviewIds").value(review.getId());
            mongoTemplate.updateFirst(movieQuery, update, Movie.class);
        }

        return review;
    }

    public List<Review> getReviewsByImdbId(String imdbId) {
        Query movieQuery = new Query(Criteria.where("imdbId").is(imdbId));
        Movie movie = mongoTemplate.findOne(movieQuery, Movie.class);

        if (movie != null && movie.getReviewIds() != null) {
            Query reviewQuery = new Query(Criteria.where("_id").in(movie.getReviewIds()));
            return mongoTemplate.find(reviewQuery, Review.class);
        }
        return List.of();
    }
}
