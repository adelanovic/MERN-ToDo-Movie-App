//Displays Upcoming Movies /upcoming/

import React, {Component} from 'react';
import axios from 'axios';

export default class Upcoming extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: []
        };

        this.upcomingMovies = this.upcomingMovies.bind(this);
        this.addMovie = this.addMovie.bind(this);
    }

    //Executes popularMovies function on window load
    componentDidMount() {
        this.upcomingMovies().then(r => console.log("Loading Upcoming Movies"));

    }



    componentWillUnmount() {
        this.upcomingMovies().then(r => console.log("Loading Upcoming Movies"));
    }

    //Gets data from TMDB
    async upcomingMovies() {
        const response = await axios.get(
            "https://api.themoviedb.org/3/movie/upcoming?api_key=a591ff1a7bf1324894e2c720c1fe0f2c&language=en-US&page=1")
        console.log(response.data.results)
        this.setState({movies:response.data.results})

    }

    async addMovie(e){
        e.preventDefault();
        var id = e.target.value;
        console.log(id);
        const response = await axios.get(
            "https://api.themoviedb.org/3/movie/"+id+"?api_key=a591ff1a7bf1324894e2c720c1fe0f2c&language=en-US"
        );


        const movie = response.data;
        movie._id = movie.id;
        delete movie.id;

        console.log(movie);


        axios.post('http://localhost:4000/todos/add', movie).then(response => {
            console.log(response.data)
        }).catch(error => {
            console.log(error.response)
        })
    }

    budgetReturn(movie) {
        window.alert(movie.title + " was released on " + movie.release_date +".")
    }

    render() {
        return(

            <div className="container">
                <h2 className="bg-success tableHeader" style={{marginTop: 20, fontWeight: "bold" }}>Coming Soon</h2>
                <table className="table table-striped table-dark bg-dark" style={{marginTop: 20 }}>
                    <tbody>
                    {this.state.movies &&
                    this.state.movies.map((movie, index) => {
                        return (
                            <tr key={movie.id}>
                                <td>
                                    { movie.poster_path == null ? <img className="imageOutline" src={"https://i.pinimg.com/originals/22/9b/c4/229bc4691f29a0c8c6391661f966d032.jpg"} style={{ width: 300,
                                        height: 500}}  alt="Poster"
                                    /> : <img className="imageOutline" src={`http://image.tmdb.org/t/p/w300${movie.poster_path}`} alt="Poster"
                                    />}
                                </td>
                                <td><div className="bg-success tableHeader">Title</div>{movie.title}</td>
                                <td><div className="bg-success tableHeader" >Description</div>{movie.overview}</td>
                                <td><div className="bg-success tableHeader" >Rating</div>{movie.vote_average} based on {movie.vote_count} votes</td>
                                <td>
                                    <button className="btn btn-outline-success my-sm-1 btn-block"
                                            type="submit" value={movie.id} onClick={this.addMovie} >Add</button>
                                    <button className="btn btn-outline-success my-sm-1 btn-block"
                                            type="submit" onClick={()=>{this.budgetReturn(movie)}}>Release Date</button>
                                </td>
                            </tr>
                        )
                    })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}
