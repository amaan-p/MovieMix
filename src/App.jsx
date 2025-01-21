import {  BrowserRouter,Routes, Route } from "react-router";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Searchpage from "./pages/Searchpage";
import SpecificSearchPage from "./pages/SpecificSearchPage";
import MovieDetails from "./pages/MovieDetails";
import LatestMovies from "./pages/LatestMovies";
import RandomMovies from "./pages/RandomMovies";
import ErrorPage from "./pages/ErrorPage";
const App = () => {
  return (
    <div className="bg-gradient-to-b from-black to-slate-950 min-h-screen">
      <div className="backdrop-blur-md">
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/search" element={<Searchpage />} />
            <Route path="/search/:moviename" element={<SpecificSearchPage />} />
            <Route path="/:movieid" element={<MovieDetails />} />
            <Route path="/movies" element={<RandomMovies />} />
            <Route path="/popular" element={<LatestMovies />} />
            <Route path="/*" element={<ErrorPage/> } />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
