import axios from "axios";
import React, { useEffect, useState } from "react";

const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]); // State untuk top rated movies
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  // Fungsi untuk mengambil daftar genre
  const ambilGenre = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?language=en",
        {
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDVhZDI3ZTkxOTgwMjE1NTM0MjBiMWVjZmZlNDkzNiIsIm5iZiI6MTcyOTQxMDcwOC4zMzgzMzMsInN1YiI6IjY3MDQ4MzQ3YmQ3Y2Q4NmRhNTFkMmVlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s6u89_KS9BN9YCS-Q4qLTPElAgreJfPLhSPM0R6SZU0",
          },
        }
      );
      setGenres(response.data.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  // Fungsi untuk mengambil film trending
  const ambilFilmTrending = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/trending/movie/day",
        {
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDVhZDI3ZTkxOTgwMjE1NTM0MjBiMWVjZmZlNDkzNiIsIm5iZiI6MTcyOTQxMDcwOC4zMzgzMzMsInN1YiI6IjY3MDQ4MzQ3YmQ3Y2Q4NmRhNTFkMmVlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s6u89_KS9BN9YCS-Q4qLTPElAgreJfPLhSPM0R6SZU0",
          },
        }
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  // Fungsi untuk mengambil film top rated
  const ambilFilmTop = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        {
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDVhZDI3ZTkxOTgwMjE1NTM0MjBiMWVjZmZlNDkzNiIsIm5iZiI6MTcyOTQxMDcwOC4zMzgzMzMsInN1YiI6IjY3MDQ4MzQ3YmQ3Y2Q4NmRhNTFkMmVlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s6u89_KS9BN9YCS-Q4qLTPElAgreJfPLhSPM0R6SZU0",
          },
        }
      );
      setTopMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching top rated movies:", error);
    }
  };

  useEffect(() => {
    ambilFilmTrending();
    ambilGenre();
    ambilFilmTop(); // Memanggil film top rated saat komponen pertama kali di-render
  }, []);

  // Mendapatkan nama genre berdasarkan ID genre
  const getGenreNames = (genreIds) => {
    return genreIds
      .map((id) => {
        const genre = genres.find((g) => g.id === id);
        return genre ? genre.name : null;
      })
      .filter((name) => name !== null)
      .join(", ");
  };

  // Filter film trending berdasarkan genre yang dipilih
  const filteredMovies = selectedGenre
    ? movies.filter((movie) => movie.genre_ids.includes(selectedGenre))
    : movies;

  // Filter film top rated berdasarkan genre yang dipilih
  const filteredTopMovies = selectedGenre
    ? topMovies.filter((movie) => movie.genre_ids.includes(selectedGenre))
    : topMovies;

  return (
    <div className="bg-black text-white p-6 dark:bg-amber-300">
      <h2 className="text-3xl font-bold mb-4 text-center">LIST & GENRE MOVIES</h2>

      {/* Tombol Pilihan Genre */}
      <div className="flex flex-wrap justify-center space-x-4 mb-6 gap-y-4">
        <button
          className={`py-2 px-4 rounded-lg ${
            selectedGenre === null ? "bg-amber-400" : "bg-gray-600"
          }`}
          onClick={() => setSelectedGenre(null)}
        >
          All Genres
        </button>
        {genres.map((genre) => (
          <button
            key={genre.id}
            className={`py-2 px-4 rounded-lg ${
              selectedGenre === genre.id ? "bg-green-500" : "bg-gray-600"
            }`}
            onClick={() => setSelectedGenre(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* Daftar Film Trending */}
      <h2 className="text-3xl font-bold mb-4 text-center">Trending Movies</h2>
      <div className="flex overflow-x-scroll space-x-4">
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            className="min-w-[200px] md:min-w-[240px] lg:min-w-[280px] flex-shrink-0 bg-gray-800 rounded-lg overflow-hidden shadow-md"
          >
            <figure>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-[300px] object-cover"
              />
            </figure>
            <div className="p-4">
              <h3 className="text-xl font-semibold truncate">{movie.title}</h3>
              <p className="text-sm text-gray-400">Rating: {movie.vote_average}</p>
              <p className="text-sm text-gray-400">Release Date: {movie.release_date}</p>
              <p className="text-sm text-gray-400">
                Genres: {getGenreNames(movie.genre_ids)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Daftar Film Top Rated */}
      <h2 className="text-3xl font-bold mt-8 mb-4 text-center">Top Rated Movies</h2>
      <div className="flex overflow-x-scroll space-x-4">
        {filteredTopMovies.map((movie) => (
          <div
            key={movie.id}
            className="min-w-[200px] md:min-w-[240px] lg:min-w-[280px] flex-shrink-0 bg-gray-800 rounded-lg overflow-hidden shadow-md"
          >
            <figure>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-[300px] object-cover"
              />
            </figure>
            <div className="p-4">
              <h3 className="text-xl font-semibold truncate">{movie.title}</h3>
              <p className="text-sm text-gray-400">Rating: {movie.vote_average}</p>
              <p className="text-sm text-gray-400">Release Date: {movie.release_date}</p>
              <p className="text-sm text-gray-400">
                Genres: {getGenreNames(movie.genre_ids)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingMovies;
