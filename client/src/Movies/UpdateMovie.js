import React, {useState, useEffect} from 'react';

import { Paper , TextField , Button , makeStyles} from '@material-ui/core';
import axios from 'axios';

const initialMovie = {
title: '',
director: '',
metascore: '',
stars: []
}
const useStyles = makeStyles(() => ({
  input: {
      fontSize: '1.5rem',
  }
}));
const UpdateMovie = (props) => {
    const classes = useStyles();
    const [movie, setMovie] = useState(initialMovie)

    const handleChange = event => {
        event.persist();
        setMovie({
            ...movie,
            [event.target.name]: event.target.value
        })
    }
    // useEffect(() => {
    //     // only set the state if we have data from the api
    //     // Solves refresh race condition
    //     if (props.movies.length > 0) {
    //       const newMovie = props.movies.find(
    //         thing => `${thing.id}` === props.match.params.id
    //       );
    //       setMovie(newMovie);
    //     }
    //   }, [props.movies, props.match.params.id]);

    const handleSubmit = event => {
        event.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(response => {
            console.log(response)
            props.updateItems(response);
            props.history.push('/');
        })
        .catch(error => console.log(error)
        );
    }

    // if (props.movies.length === 0) {
    //     return <h2>Loading data...</h2>;
    //   }

    return (
        <div>
            <Paper className={classes.paper} >
                <form onSubmit={handleSubmit}>
                <TextField
                className={classes.input}
                id="outlined-basic"
                label="title"
                name="title"
                margin="normal"
                variant="outlined"
                value={movie.title}
                onChange={handleChange}
                />
                <TextField
                className={classes.input}
                id="outlined-basic"
                label="director"
                name="director"
                margin="normal"
                variant="outlined"
                value={movie.director}
                onChange={handleChange}
                />
                <TextField
                className={classes.input}
                id="outlined-basic"
                label="metascore"
                name="metascore"
                margin="normal"
                variant="outlined"
                value={movie.metascore}
                onChange={handleChange}
                />
                <TextField
                className={classes.input}
                id="outlined-basic"
                label="stars"
                name="stars"
                margin="normal"
                variant="outlined"
                value={movie.stars}
                onChange={handleChange}
                />
                <Button style={{background: 'green'}} >submit</Button>
                </form>
            </Paper>
        </div>
    )
}

export default UpdateMovie;