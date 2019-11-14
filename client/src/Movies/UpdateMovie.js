import React, {useState} from 'react';



import { Paper , TextField , Button , makeStyles} from '@material-ui/core';
import Axios from 'axios';

const initialMovie = {
title: '',
director: '',
metascore: '',
stars: []
}

const useStyles = makeStyles(() => ({
  paper: {

  },
  input: {
      fontSize: '1.5rem',
  }
}));

const UpdateMovie = () => {
    const classes = useStyles();
    const [movie, setMovie] = useState(initialMovie)

    const handleChange = event => {
        event.persist();
        setMovie({
            ...movie,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault();
        Axios.put(`http://localhost:3001/api/movies/:${movie.id}`, movie)
        .then(response => console.log(response))
        .catch(error => console.log(error)
        );
    }

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