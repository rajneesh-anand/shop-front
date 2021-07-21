import React, { useEffect, useState } from "react";
import MovieCard from "../../../components/movie/movie-card";
import Router, { useRouter } from "next/router";

const MovieContainer = ({ movieData }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  useEffect(() => {
    if (movieData) {
      // Error check
      if (movieData.error) {
        // Handle error
      } else {
        setMovies(movieData.data);
      }
    }
  }, [movieData]);

  // Router event handler
  useEffect(() => {
    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeComplete", stopLoading);
    return () => {
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeComplete", stopLoading);
    };
  }, []);

  // Listen to scroll positions for loading more data on scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const handleScroll = () => {
    // To get page offset of last user
    const lastUserLoaded = document.querySelector(
      ".post-items-style1 > .movielist:last-child"
    );
    if (lastUserLoaded) {
      const lastUserLoadedOffset =
        lastUserLoaded.offsetTop + lastUserLoaded.clientHeight;
      const pageOffset = window.pageYOffset + window.innerHeight;
      if (pageOffset > lastUserLoadedOffset) {
        // Stops loading
        /* IMPORTANT: Add !loading  */
        if (movieData.curPage < movieData.maxPage && !loading) {
          // Trigger fetch
          const query = router.query;
          query.page = parseInt(movieData.curPage) + 1;
          router.push({
            pathname: router.pathname,
            query: query,
          });
        }
      }
    }
  };

  return (
    <>
      <div className="blog-area blog-masonry-area">
        <div className="container">
          <div className="row post-items-style1">
            {movies.length > 0 &&
              movies.map((movie, i) => {
                return (
                  <div
                    key={movie.id}
                    className={"col-sm-6 col-md-6 col-lg-3 movielist"}
                    style={{ marginTop: "10px" }}
                  >
                    <MovieCard data={movie} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {loading && (
        <div className="hv-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieContainer;
