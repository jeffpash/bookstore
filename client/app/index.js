const React = require('react');
const ReactDOM = require('react-dom');
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { Books } from "../components/books";

//import css from '../css/styles.css';

class Bookstore extends React.Component {
  render() {
    return (
      <div className="navbar-wrapper">
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Bookstore</a>
              <a className="navbar-brand" href="#" onClick="list">Books</a>
              <a className="navbar-brand" href="#">Genres</a>
            </div>
            <div id="navbar" className="collapse navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a href="#/books/add">Add Book</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>coming soonnn!!!.......</h1>

            </div>
          </div>
        </div>

      </div>
    );
  };
}


ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={ Bookstore }></Route>
  </Router>,
  document.getElementById('bookpage'));
