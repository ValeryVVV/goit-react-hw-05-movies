import { getMovieReview } from "api/movie-api";
import React from "react"
import { useState } from "react";
import { useEffect } from "react";
import PropTypes from 'prop-types';

export default function Reviews({ movieId }) {
    const [review, setReview] = useState([]);

    useEffect(() => {
        const getCast = async () => {
          const { review } = await getMovieReview(movieId);
          setReview(review);
        };
    
        getCast();
      }, [movieId]);


  return (
    <>
      {review.length > 0 ? (
        <>
          <ul>
            {review.map(({ id, author, content }) => (
              <li key={id}>
                <p>{author}</p>
                <p>{content}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>We don't have any reviews for this movie</p>
      )}
      </>
  );
}

Reviews.propTypes = {
    movieId: PropTypes.string.isRequired,
  };
