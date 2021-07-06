import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";

import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from './Movies/UpdateMovie';

import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [ films, setFilms] = useState([])

  useEffect(() => {
      axios 
      .get("http://localhost:5000/api/movies")
      .then(response => {
          setFilms(response.data)
      })
      .catch(err => console.log(err.response))
  },[])
  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route path="/update-movie/:id" render={props => (<UpdateMovie {...props} films={films}  updateFilms={setFilms} />)} />
     
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
    </>
  );
};

export default App;
 // render={ props => ( <UpdateMovie {...props} movies={this.state.movies} updateList={this.setState} />)} 
      //   />