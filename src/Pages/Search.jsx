import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");

  const handleSearch = useCallback((input) => {
    setSearchParams({ q: input });
  }, [setSearchParams]);

  const fetchSearchResults = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
        {
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDVhZDI3ZTkxOTgwMjE1NTM0MjBiMWVjZmZlNDkzNiIsIm5iZiI6MTcyODM1ODA4OS4xNzA5MTMsInN1YiI6IjY3MDQ4MzQ3YmQ3Y2Q4NmRhNTFkMmVlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PKvFr24CXjaX4e_aCqxS6cJn4XPKlhf5_0TXDCU24J0",
          },
        }
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }, [query]);

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults, query]);

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Search Bar */}
      <div className="container mx-auto py-8">
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search for a movie..."
            value={query || ""}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-1/2 p-3 rounded bg-gray-800 text-white"
            autoFocus
          />
        </div>

        {/* Search Results */}
        <h1 className="text-4xl font-bold text-orange-500 text-center mb-6">
          Search Results
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.id} className="relative">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-md object-cover w-full h-[450px] hover:opacity-80 transition-opacity"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-60 text-white text-center p-1 rounded">
                  {movie.title}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">No results found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
