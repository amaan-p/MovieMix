
import MovieGrid from "../components/MovieGrid";
const LatestMovies = () => {
  return <MovieGrid apilink={'/api/popular'} pagename={"Popular Now"}/>
};

export default LatestMovies;
