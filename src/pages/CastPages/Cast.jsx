import { getMovieCast, IMAGE_URL } from "api/movie-api";
import React from "react"
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Cast() {
    const [cast, setCast] = useState([]);
    const { movieId } = useParams();

      useEffect(() => {
        if (!movieId) return;
        const getCast = async id => {
          const getInfoCast = await getMovieCast(id);
          setCast(getInfoCast);
        };
    
        getCast(movieId);
      }, [movieId]);


  return (
    <ul>
      {cast &&
        cast.map(({ id, profile_path, name, character }) => (
          <li key={id}>
            <img
              src={
                  profile_path
                  ? `${IMAGE_URL}${profile_path}`
                  : 'https://upload.wikimedia.org/wikipedia/commons/2/2f/No-photo-m.png'
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
