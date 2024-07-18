import React, { useEffect, useRef, useState } from 'react';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';
import ReviewList from './ReviewList';

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    // Initialize reviews as an empty array if it's not passed as a prop
    const [localReviews, setLocalReviews] = useState(reviews || []);

    useEffect(() => {
        getMovieData(movieId);
        // Optionally fetch the initial list of reviews here
    }, [movieId]);

    const addReview = async (e) => {
        e.preventDefault();
        const rev = revText.current.value;

        try {
            // Post the review to the backend
            const response = await api.post("/api/v1/reviews", { reviewBody: rev, imdbId: movieId });

            // Add the new review to the state
            const newReview = { body: rev }; // Adjust based on the structure of your review object
            setLocalReviews(prevReviews => [...prevReviews, newReview]);

            // Clear the review input field
            revText.current.value = "";
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Container>
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img src={movie?.poster} alt="" />
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <hr />
                        </Col>
                    </Row>
                    <Row>
                        <ReviewList movieId={movieId} />
                    </Row>
                    {localReviews?.map((r, index) => (
                        <React.Fragment key={index}>
                            <Row>
                                <Col>{r.body}</Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                        </React.Fragment>
                    ))}
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    )
}

export default Reviews;
