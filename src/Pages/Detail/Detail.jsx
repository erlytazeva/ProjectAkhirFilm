import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./DetailMovie.css"; // Buat file CSS terpisah untuk styling

const Detail = () => {
  const { id } = useParams(); // Mengambil ID film dari URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const RatingMovies = async (rating) => {
    try {
      const response = await axios.post(
        `https://api.themoviedb.org/3/movie/${id}/rating`,
        { value: rating },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json;charset=utf-8",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDVhZDI3ZTkxOTgwMjE1NTM0MjBiMWVjZmZlNDkzNiIsIm5iZiI6MTcyOTQxMDcwOC4zMzgzMzMsInN1YiI6IjY3MDQ4MzQ3YmQ3Y2Q4NmRhNTFkMmVlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s6u89_KS9BN9YCS-Q4qLTPElAgreJfPLhSPM0R6SZU0",
          },
        }
      );
      if (response.data.status_code === 1) {
        alert("Rating berhasil!");
      } else if (response.data.status_code === 12) {
        alert("Rating diupdate!");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // Fungsi untuk mengambil data detail film
    const fetchMovieDetail = async () => {
      try {
        const response = await axios(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          {
            headers: {
              Accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDVhZDI3ZTkxOTgwMjE1NTM0MjBiMWVjZmZlNDkzNiIsIm5iZiI6MTcyODM1ODA4OS4xNzA5MTMsInN1YiI6IjY3MDQ4MzQ3YmQ3Y2Q4NmRhNTFkMmVlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PKvFr24CXjaX4e_aCqxS6cJn4XPKlhf5_0TXDCU24J0",
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="detail-container">
      {movie && (
        <>
          <div className="detail-poster">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
          <div className="detail-info">
            <h1 className="movie-title">{movie.title}</h1>
            <p className="movie-overview">{movie.overview}</p>
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p>
              <strong>Rating:</strong> {movie.vote_average}
            </p>
            <p>
              <strong>Genres:</strong>{" "}
              {movie.genres.map((genre) => genre.name).join(", ")}
            </p>

            {/* Rating section */}
            <div className="rating">
              <h3>Rate this movie:</h3>

              <div className="rating">
                <input
                  type="radio"
                  name="rating"
                  onClick={() => RatingMovies(2)}
                  className="mask mask-star-2 bg-orange-400"
                />
                
                <input
                  type="radio"
                  name="rating"
                  onClick={() => RatingMovies(4)}
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating"
                  onClick={() => RatingMovies(6)}
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating"
                  onClick={() => RatingMovies(8)}
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating"
                  onClick={() => RatingMovies(10)}
                  className="mask mask-star-2 bg-orange-400"                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Detail;
