import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import MovieList from "./components/movie-list.component";
import MovieSearch from "./components/movie-search.component";
import Popular from "./components/Popular";
import Upcoming from "./components/Upcoming";
import Top from "./components/Top";

//Logo
import logo from "./logo.jpg"

function App() {
  return (
      <Router>
          <div className="container">
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark  ">
                  <a className="navbar-brand" href="https://themoviedb.org">
                      <img className="imageOutline" src={logo} width="80" height="80" alt="Movie DB"/>
                  </a>
                  <Link to="/" className="navHeader">Movie Database</Link>
                  <div className="collapse navbar-collapse">
                      <ul className="navbar-nav mr-auto bg-">
                          <li className="navbar-item">
                              <Link to="/" className="nav-link navLinks">| Home |</Link>
                          </li>
                          <li className="navbar-item">
                              <Link to="/movielist" className="nav-link navLinks"> | Movie List |</Link>
                          </li>
                          <li className="navbar-item">
                              <Link to="/popular" className="nav-link navLinks"> | Popular Movies |</Link>
                          </li>
                          <li className="navbar-item">
                              <Link to="/upcoming" className="nav-link navLinks"> | Coming Soon |</Link>
                          </li>
                          <li className="navbar-item">
                              <Link to="/top" className="nav-link navLinks"> | Top Movies |</Link>
                          </li>
                      </ul>
                  </div>

              </nav>

              <Route path="/" exact component={ MovieSearch } />
              <Route path="/movielist" component={ MovieList} />
              <Route path="/popular" component={ Popular } />
              <Route path="/upcoming" component={ Upcoming } />
              <Route path="/top" component={ Top } />
          </div>
      </Router>

  );
}

export default App;
