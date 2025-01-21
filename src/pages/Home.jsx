import { useState, useEffect } from "react";
import HeroCarousel from "../components/HeroCarousel";
import { NavLink } from "react-router";
import MovieGrid from "../components/MovieGrid";

const Home = () => {
  const [movies, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //const BASE_URL =  "http://localhost:5000";
    fetch("/api/live")
      .then((res) => res.json())
      .then((data) => {
        setMoviesData(data); // Assume the backend sends enriched movie data
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Live movies:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="min-h-screen relative">
      <div className="relative z-10">
        <HeroCarousel movies={movies.slice(0, 4)} />
        <MovieGrid apilink={"/api/trending"} pagename={"Trending now"} />
      </div>
    </div>
  );
};

export default Home;
