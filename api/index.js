import express from "express";
import cors from "cors";
import dotenv from "dotenv"

dotenv.config();

const app = express();


const BASE_URL = process.env.BASE_URL;
const API_KEY = process.env.API_KEY;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      `Bearer ${API_KEY}`,
  },
};

app.use(cors());

// Search endpoint
app.get("/api/search", async (req, res) => {
  try {
    const movieName = req.query.name;
    const pagenumber = req.query.page;

    // Build the URL dynamically
    const url = pagenumber
      ? `${BASE_URL}/search/movie?query=${encodeURIComponent(
          movieName
        )}&page=${pagenumber}`
      : `${BASE_URL}/search/movie?query=${encodeURIComponent(movieName)}`;

    const response = await fetch(url, options);

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

// Trending movies endpoint
app.get("/api/trending", async (req, res) => {
  try {
    const response = await fetch(`${BASE_URL}/trending/movie/day`, options);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    res.status(500).json({ error: "Failed to fetch trending movies" });
  }
});


// Search endpoint
app.get("/api/moviedetails", async (req, res) => {
  try {
    const movieId = req.query.id;
    if (!movieId) {
      return res.status(400).json({ error: "Movie ID is required" });
    }

    // Fetch the main movie details
    const movieResponse = await fetch(`${BASE_URL}/movie/${movieId}`, options);
    if (!movieResponse.ok) {
      throw new Error("Failed to fetch movie details");
    }
    const movieData = await movieResponse.json();

    // Fetch the movie credits (cast)
    const creditsResponse = await fetch(`${BASE_URL}/movie/${movieId}/credits`, options);
    if (!creditsResponse.ok) {
      throw new Error("Failed to fetch movie credits");
    }
    const creditsData = await creditsResponse.json();

    // Fetch the streaming providers
    const streamResponse = await fetch(`${BASE_URL}/movie/${movieId}/watch/providers`, options);
    if (!streamResponse.ok) {
      throw new Error("Failed to fetch streaming providers");
    }
    const streamData = await streamResponse.json();

    // Add top 3 cast members to the movie details
    movieData.cast = creditsData.cast ? creditsData.cast.slice(0, 3) : [];

    // Add streaming providers for US (default to empty object if not found)
    movieData.stream = streamData.results && streamData.results.US ? streamData.results.US : {};
    res.json(movieData);
  } catch (error) {
    console.error("Error fetching movie details:", error.message);
    res.status(500).json({ error: error.message || "Failed to fetch movie details" });
  }
});



// Trending movies endpoint
app.get("/api/live", async (req, res) => {
  try {
    const response = await fetch(`${BASE_URL}/trending/movie/day`, options);
    const data = await response.json();
    const moviesWithCast = await Promise.all(
      data.results.map(async (movie) => {
        const data_response = await fetch(
          `${BASE_URL}/movie/${movie.id}/credits`,
          options
        );
        const moviedata = await data_response.json();
        movie["cast"] = moviedata.cast.slice(0, 4); // Add the cast to the movie
        return movie;
      })
    );
    res.json(moviesWithCast);
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    res.status(500).json({ error: "Failed to fetch trending movies" });
  }
});

//toprated movies endpoint
app.get("/api/top_rated", async (req, res) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/top_rated?language=en-US&page=1`,
      options
    );
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    res.status(500).json({ error: "Failed to fetch trending movies" });
  }
});



//popilar movies endpoint
app.get("/api/popular", async (req, res) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?language=en-US&page=1`,
      options
    );
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    res.status(500).json({ error: "Failed to fetch trending movies" });
  }
}
)
app.listen(5000, () => console.log("Server running on port 5000"));
