import React, {Component} from 'react';
import { Link } from 'react-router-dom';

//Axios connects the front end to the back end using get/put/push etc.
import axios from 'axios';

//Todo defined for our return
const Movie = props => (
    <tr>
        <td><img src={"https://image.tmdb.org/t/o/w388/"+props.movie.poster_path}/></td>
        <td>{props.movie.title}</td>
        <td>{props.movie.overview}</td>
        <td>
            <Link to={"/view/"+props.todo.id}>Edit</Link>
        </td>
    </tr>
)

export default class MovieList extends Component {

    constructor(props) {
        super(props);
        this.state = {movies: []};

        //this.handleDeleteToo = this.handleDeleteToo.bind(this);
    }

    //Initialize/send request to back end of Todos items
    componentDidMount() {

        //Get list of Todos
        axios.get('http://localhost:4000/todos/')
            .then(response => {
                this.setState({movies: response.data});
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    //Refresh the page so it immediately shows the change
    componentDidUpdate(prevProps, prevState, snapshot) {
        //Get list of Todos
        axios.get('http://localhost:4000/todos/')
            .then(response => {
                this.setState({movies: response.data});
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    todoList() {
        return this.state.movies.map(function (currentMovie, i) {
            return <Movie movie={currentMovie} key={i}/>;
        });
    }


/*

I had issues with this function, kept deleting FIFO (First in first out) instead of by ID
handleDelete(movie){
    axios.delete('http://localhost:4000/todos/delete/'+movie)
        .then(response => {
            console.log(response.data)
        })
        .catch(function (error) {
            console.log(error)
        })

}
 */

//Got help with this from stackoverflow.com
    handleDeleteToo = movieId => {

        const requestOptions = {
            method: 'DELETE'
        }

        fetch('http://localhost:4000/todos/delete/'+movieId, requestOptions)
            .then((response) =>{
                return response.json();
            })
            .then((result => {
                console.log(result);
            }))

    };

    render() {
        return (
            <div className="container">
                <h2 className="bg-success tableHeader" style={{marginTop: 20, fontWeight: "bold" }}>Movies Collected</h2>
                <table className="table table-striped table-dark" style={{marginTop: 20 }}>
                    <tbody>
                    {this.state.movies &&
                    this.state.movies.map((movie, index ) => {
                        return (
                            <tr key={movie._id}>
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
                                            type="submit" onClick={()=> this.handleDeleteToo(movie._id)}>Remove</button>
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