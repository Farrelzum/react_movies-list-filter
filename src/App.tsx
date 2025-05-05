import React, { FormEventHandler } from 'react';
import { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [query, setQuery] = useState('');
  const [visibleMovies, setVisibleMovies] = useState([...moviesFromServer]);

  const searchQuery: FormEventHandler<HTMLInputElement> = event => {
    const value = event.currentTarget.value.trim();

    setQuery(value);

    const filteredMovies = moviesFromServer.filter(({ title, description }) => {
      return (
        title.toLowerCase().includes(value.toLowerCase()) ||
        description.toLowerCase().includes(value.toLowerCase())
      );
    });

    setVisibleMovies(filteredMovies);
  };

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
                onChange={searchQuery}
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
