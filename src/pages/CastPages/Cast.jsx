import { getMovieCast, IMAGE_URL } from "api/movie-api";
import React from "react"
import { useState } from "react";
import { useEffect } from "react";
import PropTypes from 'prop-types';

export default function Cast({ movieId }) {
    const [cast, setCast] = useState([]);

    useEffect(() => {
        const getCast = async () => {
          const { cast } = await getMovieCast(movieId);
          setCast(cast);
        };
    
        getCast();
      }, [movieId]);


  return (
    <ul>
      {cast &&
        cast.map(({ id, profile_path, name, character }) => (
          <li key={id}>
            <img
              src={
                profile_path
                  ? IMAGE_URL + profile_path
                  : `https://bitsofco.de/content/images/2018/12/broken-1.png`
              }
              alt={name}
              width="100"
              height=""
            />
            <p>{name}</p>
            <p>Character: {character}</p>
          </li>
        ))}
    </ul>
  );
}

Cast.propTypes = {
    movieId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    profile_path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    character: PropTypes.string.isRequired,
  };