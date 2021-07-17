import React from 'react';
import axios from 'axios';
import Movie from '../components/Moive';
import './Home.css';

const apiKey = "faed0bc119139c1b249748af09f1aafc";
class Home extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };
  getMovies = async () => {
    const {
      data: { results }
    } = await axios.get("https://api.themoviedb.org/3/trending/movie/day?api_key=" + apiKey);

    const {
      data: { genres }
    } = await axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=" + apiKey + "&language=en-US");

    results.forEach(movie => {
      movie['genres'] = [];
      for (var idx in movie['genre_ids']) {
        const genreId = movie['genre_ids'][idx];
        const {
          name
        } = genres.find(element => (element['id'] === genreId));
        movie['genres'].push(name);
      };
    });

    this.setState({ movies: results, isLoading: false });
  };
  componentDidMount() {
    this.getMovies();
  }
  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading
          ? (<div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
          ) : (
            <div className="movies">
              {movies.map(movie => (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  year={Number(movie.release_date.slice(0, 4))}
                  title={movie.title}
                  summary={movie.overview}
                  poster={movie.poster_path}
                  genres={movie.genres}
                />
              ))}
            </div>
          )}
      </section>
    );
  }
}

export default Home;
