import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allbooks: []
    };
  }

  componentDidMount() {
   axios.get('/api/books')
     .then(res => {
       this.setState({ allbooks: res.data });
       console.log(this.state.allbooks);
     });
   }
  // componentDidMount() {
  //   fetch('/api/books').then(res => res.json()).then(allbooks => this.setState({allbooks}));
  // }

  render() {
    return (
      <div className="container">
        <div className="row">
        <div className="navbar-brand">
          <Link to={'/'}>Books
          </Link>
        </div>
        <div className="navbar-brand">
          <Link to={'/genres'}>
            Genres
          </Link>
        </div>
        <div className="navbar-brand">
        <button type="button" className="btn btn-default btn-sm">
          <span className="glyphicon glyphicon-search"></span> Search
        </button>
      </div>
      <h4 className="nav navbar-right">
        <Link to="/add_book" ><span className="glyphicon glyphicon-plus-sign" aria-hidden="true">
        </span> Add Book </Link>
        <a className="btn btn-primary">Sign In</a>
        <a className="btn btn-danger">Sign Up</a>
      </h4>
        </div>
        <div className="row">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Bookstore</h3>
        </div>
        <div className="panel-body">
          <div className="row">
            {
              this.state.allbooks.map(book => {
                return (<div className="book col-md-6" key={book.id}>
                <div className="col-md-6">
                  <h3>{book.title.toUpperCase()}</h3>
                  <p className="parSize">{book.description}</p>
                  <Link to={`/book_details/${book._id}`} className="btn btn-primary btn-block">view details&nbsp;
                  <span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></Link>
                </div>
                <div className="col-md-6">
                  <img src={book.image_url} alt=""/>
                </div>
              </div>)})
            }

          </div>
        </div>
      </div>
    </div>
      </div>
    );
  };
}

export default Books;
