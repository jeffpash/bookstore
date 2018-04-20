const React = require('react');
const ReactDOM = require('react-dom');
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { Books } from "../components/books";

//import css from '../css/styles.css';

class Bookstore extends React.Component {
  constructor(props){
  super(props);
  this.state ={
  books: []
};
}
componentDidMount() {
  fetch('/api/books')
  .then(res => res.json())
  .then(books => this.setState({ books }));
}

render() {
  return (
    <div>
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
            <a className="navbar-brand" href="#">Books</a>
            <a className="navbar-brand" href="#">Genres</a>
          </div>
          <div id="navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#/books/add">Add Book</a></li>
                <li><button type="button" className="btn btn-success">Sign in</button></li>
                <li><button type="button" className="btn btn-danger">Sign up</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">Latest Books</h3>
      </div>
      <div className="panel-body">
        <div className="row">

      {this.state.books.map(book => <div className="col-md-3" key={book.id}>
        <div className="col-md-6">
        <h1>{book.title}</h1>
      <p>{book.description}</p>
    </div>
    <div className="col-md-6">
      <img src={book.image_url} alt=""/>
    </div>
  </div>
)}

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
