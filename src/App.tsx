import React from 'react';
import { useState, useEffect } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [query, setQuery] = useState('');
  const [visibleMovies, setVisibleMovies] = useState([...moviesFromServer]);

  useEffect(() => {
    const filteredMovies = moviesFromServer.filter(({ title, description }) => {
      return (
        title.toLowerCase().includes(query.toLowerCase()) ||
        description.toLowerCase().includes(query.toLowerCase())
      );
    });

    setVisibleMovies(filteredMovies);
  }, [query]);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = event =>
    setQuery(event.currentTarget.value.trim());

  return (
    <div className="page">
      <div className="page-content">
        <div className="box">
          <div className="field">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="search-query" className="label">
              Search movie
            </label>

            <div className="control">
              <input
                type="text"
                id="search-query"
                className="input"
                placeholder="Type search word"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <MoviesList movies={visibleMovies} />
      </div>

      <div className="sidebar">Sidebar goes here</div>
    </div>
  );
};
