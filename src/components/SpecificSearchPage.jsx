import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";

const SpecificSearchPage = () => {
  const { moviename } = useParams();
  const [movies, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, onPageChange] = useState(1);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    const toatl_pages = movies.total_pages > 10 ? 10 : movies.total_pages;
    if (currentPage < toatl_pages) {
      onPageChange(currentPage + 1);
    }
  };

  useEffect(() => {
    setLoading(true); // Ensure loading is set correctly on re-fetch
    fetch(
      `/api/search?name=${encodeURIComponent(
        moviename
      )}&page=${encodeURIComponent(currentPage)}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMoviesData(data); // Assume the backend sends enriched movie data
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setLoading(false);
      });
  }, [currentPage]);

  useEffect(() => {
    setLoading(true); // Ensure loading is set correctly on re-fetch
    fetch(`/api/search?name=${encodeURIComponent(moviename)}`)
      .then((res) => res.json())
      .then((data) => {
        setMoviesData(data); // Assume the backend sends enriched movie data
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setLoading(false);
      });
  }, [moviename]);

  return (
    <div className="min-h-screen text-white">
      <div className="px-8 md:px-12 pt-8">
        <h2 className="text-[4vw] md:text-[2.3vw] font-bold mb-4">
          Showing Results for &quot;{moviename} &quot;
        </h2>

        {loading ? (
          <p className="text-center text-lg">Loading movies...</p>
        ) : movies.results && movies.results.length > 0 ? (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 pb-8">
            {movies.results.map((movie, index) =>
              movie.poster_path ? (
<NavLink key={index} to={`/${movie.id}`}>

<div
                  key={index}
                  className="transform transition-transform duration-200 hover:scale-105"
                >
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                          : "/placeholder-image.png" // Fallback image
                      }
                      alt={movie.title || "Movie Poster"}
                      className="h-auto"
                    />
                  </div>
                </div>
</NavLink>

                
              ) : (
                <></>
              )
            )}
          </div>
        ) : (
          <p className="text-center text-lg">
            No results found for &quot;{moviename} &quot;.
          </p>
        )}
      </div>
      <div className="flex flex-row justify-center pb-3">
        <ChevronLeft
          size={20}
          onClick={handlePrevious}
          className="text-blue-600"
        />
        {/* Dots for Pages */}
        <div className="flex space-x-1 py-2 px-2">
          {Array.from(
            { length: movies.total_pages > 10 ? 10 : movies.total_pages },
            (_, index) => index + 1
          ).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-2 h-2 rounded-full  ${
                page === currentPage ? "bg-blue-600" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
        <ChevronRight
          size={20}
          onClick={handleNext}
          className="text-blue-600"
        />
      </div>
    </div>
  );
};

export default SpecificSearchPage;
