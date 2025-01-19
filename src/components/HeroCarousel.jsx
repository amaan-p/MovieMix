/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const HeroCarousel = ({ movies, onMovieSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % movies.length);
        setIsTransitioning(false);
      }, 500);
    }, 7000);

    return () => clearInterval(interval);
  }, [movies.length]);

  const handlePrevious = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
      setIsTransitioning(false);
    }, 500);
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
      setIsTransitioning(false);
    }, 500);
  };

  const handleMovieClick = (movieid) => {
    if (onMovieSelect) {
      onMovieSelect(movieid);
    } else {
      window.location.href = `/${movieid}`;
    }
  };

  const currentMovie = movies[currentIndex];

  return (
    <div className="px-8 md:px-16 pt-8">
      <div className="rounded-3xl overflow-hidden bg-black/20 backdrop-blur-sm relative">
        {/* Navigation Buttons */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Progress Indicators */}
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          {movies.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-500 ${
                index === currentIndex ? "bg-white w-8" : "bg-white/50 w-4"
              }`}
            />
          ))}
        </div>

        {/* Carousel Slides */}
        <div className="h-[70vh] relative overflow-hidden">
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            {currentMovie && (
              <>
                <img
                  src={`https://image.tmdb.org/t/p/original${currentMovie.poster_path}`}
                  alt={currentMovie.title}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                <div className="absolute bottom-20 left-10 max-w-xl">
                  <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 text-nowrap">
                    {currentMovie.title}
                  </h1>
                  <div className="bg-black/70 text-white px-2 py-1 rounded-full text-sm flex items-center gap-1 w-fit mb-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>{currentMovie.vote_average?.toFixed(1)}</span>
                  </div>
                  <p className="text-xs md:text-md text-gray-200 mb-6 text-wrap">
                    {currentMovie.overview}
                  </p>
                  {currentMovie.cast && (
                    <p className="text-xs md:text-md text-gray-200 mb-6 flex flex-row flex-wrap">
                      Starring:{" "}
                      {currentMovie.cast.slice(0, 3).map((actor, i, arr) => (
                        <span key={i} className="px-1">
                          {actor.name}
                          {i < arr.length - 1 ? "," : ""}
                        </span>
                      ))}
                    </p>
                  )}
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleMovieClick(currentMovie.id)}
                      className="px-8 py-2 bg-white text-black rounded hover:bg-white/90 flex items-center"
                    >
                      Play
                    </button>
                    <button
                      onClick={() => handleMovieClick(currentMovie.id)}
                      className="px-8 py-2 bg-gray-500/50 text-white rounded hover:bg-gray-500/40"
                    >
                      More Info
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;