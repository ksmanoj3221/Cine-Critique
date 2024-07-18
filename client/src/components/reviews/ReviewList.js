import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';
import { Row, Col } from 'react-bootstrap';

const ReviewList = ({ movieId }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await api.get(`/api/v1/reviews/${movieId}`);
                setReviews(response.data);
            } catch (error) {
                console.error('Failed to fetch reviews', error);
            }
        };

        if (movieId) {
            fetchReviews();
        }
    }, [movieId]);

    return (
        <div>
            <h4>Reviews for Movie</h4>
            {reviews.length === 0 ? (
                <p>No reviews yet.</p>
            ) : (
                reviews.map((review) => (
                    <Col>
                        <Row key={review._id}>
                            <Col>{review.body}</Col>
                        </Row>
                        <Row>
                            <hr />
                        </Row>
                    </Col>
                ))
            )}
        </div>
    );
};

export default ReviewList;
