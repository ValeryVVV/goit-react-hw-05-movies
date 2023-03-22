import { getMovieReview } from "api/movie-api";
import React from "react"
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Reviews() {
    const [review, setReview] = useState([]);
    const { movieId } = useParams();

      useEffect(() => {
        if (!movieId) return;
        const getReview = async id => {
          const getInfoReview = await getMovieReview(id);
          setReview(getInfoReview);
        };
    
        getReview(movieId);
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
