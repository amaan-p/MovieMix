import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router";
import Navigation from "./components/Navigation";
import Seachpage from "./components/Seachpage";
import SpecificSearchPage from "./components/SpecificSearchPage";
import MovieDetails from "./components/MovieDetails";
import Movies from "./components/Movies";
const App = () => {
  return (
    <div className="bg-gradient-to-b from-black to-slate-950 min-h-screen">
      <div className="backdrop-blur-md">
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/*" element={<div>Sorry Not Found</div>} />
            <Route path="/search" element={<Seachpage />} />
            <Route path="/search/:moviename" element={<SpecificSearchPage />} />
            <Route path="/:movieid" element={<MovieDetails />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/*" element={<div className="flex justify-center text-4xl text-white">Sorry Not Found</div>} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
