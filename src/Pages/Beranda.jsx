import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Contoh = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const navigate = useNavigate();

  const fetchTrendingMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/trending/movie/day",
        {
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDVhZDI3ZTkxOTgwMjE1NTM0MjBiMWVjZmZlNDkzNiIsIm5iZiI6MTcyODM1ODA4OS4xNzA5MTMsInN1YiI6IjY3MDQ4MzQ3YmQ3Y2Q4NmRhNTFkMmVlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PKvFr24CXjaX4e_aCqxS6cJn4XPKlhf5_0TXDCU24J0",
          },
        }
      );
      setTrendingMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  const fetchNowPlayingMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing",
        {
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDVhZDI3ZTkxOTgwMjE1NTM0MjBiMWVjZmZlNDkzNiIsIm5iZiI6MTcyODUyMzg4NC41MzgwODgsInN1YiI6IjY3MDQ4MzQ3YmQ3Y2Q4NmRhNTFkMmVlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VyAyLXgkNsPLWJ2yRDnPn1oL1mxin3MIoC1OK1aj5xE",
          },
        }
      );
      setNowPlayingMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching now playing movies:", error);
    }
  };

  useEffect(() => {
    fetchTrendingMovies();
    fetchNowPlayingMovies();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen dark:bg-amber-300">
      <div className="container mx-auto py-8">
        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search for a movie..."
            className="w-1/2 p-3 rounded bg-gray-800 text-white"
            onChange={(e) => navigate("/Search?q=" + e.target.value)}
          />
        </div>

        {/* Trending Movies */}
        <section className="mb-12">
          <h1 className="text-4xl font-bold text-amber-500 mb-6">
            Trending Movies
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {trendingMovies.map((movie) => (
              <div key={movie.id} className="relative">
                <Link to={"/Movie/" + movie.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-md object-cover w-full h-[450px] hover:opacity-80 transition-opacity"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-60 text-white text-center p-1 rounded">
                    {movie.title}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Now Playing Movies */}
        <section>
          <h1 className="text-4xl font-bold text-orange-500 mb-6">
            Now Playing
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {nowPlayingMovies.map((movie) => (
              <div key={movie.id} className="relative">
                <Link to={"/Movie/" + movie.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-md object-cover w-full h-[450px] hover:opacity-80 transition-opacity"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-60 text-white text-center p-1 rounded">
                    {movie.title}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contoh;
