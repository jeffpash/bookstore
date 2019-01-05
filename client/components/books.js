import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allbooks: []
    };
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.get('/api/books').then(res => {
      this.setState({allbooks: res.data});
      console.log(this.state.allbooks);
    })
    .catch((error) => {
  if(error.response.status === 401) {
    this.props.history.push("/login");
  }
});
}

logout () {
localStorage.removeItem('jwtToken');
window.location.reload();
}

  // componentDidMount() {
  //   fetch('/api/books').then(res => res.json()).then(allbooks => this.setState({allbooks}));
  // }

  render() {
    return (
      <div className="container">
      <div className="row">
        <div className="navbar-brand">
          <strong>BOOKSTORE</strong>
        </div>
        <form className="navbar-form navbar-left" role="search">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Search"/>
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
        <ul className="nav navbar-nav navbar-right">
          {/* <li>
            <p className="navbar-text">Already have an account?</p>
          </li> */}
          {/* <li>
          <Link to='/login'><b>Login</b></Link>
        </li> */}
        {/* <li>
        <Link to='/register'><b>Register</b></Link>
      </li> */}
      <li>
        {localStorage.getItem('jwtToken') &&
                <p className="navbar-text" onClick={this.logout}><b>Logout&nbsp;&nbsp;<span className="glyphicon glyphicon-off"/></b></p>
              }
    </li>
        </ul>
      </div>
      <div className="row">
        <div className="navbar-brand">
          <Link to={'/'}>
            Books
          </Link>
        </div>
        <div className="navbar-brand">
          <Link to={'/genres'}>
            Genres
          </Link>
        </div>
        <div className="navbar-brand pull-right">
          <Link to="/add_book">
            <span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
            Add Book
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Book List</h3>
          </div>
          <div className="panel-body">
            <div className="row">
              {
                this.state.allbooks.map(book => {
                  return (
                    <div className="book col-md-6" key={book._id}>
                    <div className="col-md-6">
                      <h3>{book.title.toUpperCase()}</h3>
                      <p className="parSize">{book.description}</p>
                      <Link to={`/book_details/${book._id}`}
                      className="btn btn-primary btn-block">view details&nbsp;
                        <span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                      </Link>
                    </div>
                    <div className="col-md-6">
                      <img src={book.image_url} alt=""/>
                    </div>
                  </div>)
                })
              }

            </div>
          </div>
          <div className="panel-footer">
            <div className="row">
              <div className="cont col-md-2">
                <Link to="#">
                  <i className="fab fa-linkedin"/>&nbsp;
                  linkedin
                </Link>
              </div>
                <div className="cont col-md-2">
                <Link to="#">
                  <i className="fab fa-facebook-f" />&nbsp;
                  facebook
                </Link>
              </div>
                <div className="cont col-md-2">
                <Link to="#">
                  <i className="fab fa-google-plus-g"></i>&nbsp;
                  google+
                </Link>
              </div>
              <div className="cont col-md-2">
                <Link to="#">
                <i className="fab fa-twitter" />&nbsp;
                twitter
              </Link>
              </div>
                <div className="col-md-2">
                  <i className="fas fa-envelope"></i>&nbsp;
                  <Link to="#">
                  contact us :Email@gmail.com
                  </Link>
                </div>
                <div className="col-md-2">
                  <i>&copy; 2018 BookStore,powered by jeffpash.Inc.</i>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
  };
}

export default Books;
