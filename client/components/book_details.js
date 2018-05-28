import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Details extends Component {

  constructor(props) {
    super(props);
    this.state = {
      book: {}
    };
  }

  componentDidMount() {
    axios.get('/api/books/' + this.props.match.params.id).then(res => {
      this.setState({book: res.data});
      console.log(this.state.book);
    });
  }

  delete(id) {
    console.log(id);
    axios.delete('/api/books/' + id).then((result) => {
      this.props.history.push("/")
    });
  }

  render() {
    return (
    <div className="container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h2 className="panel-title">
            <strong>{this.state.book.title}</strong>
          </h2>
        </div>
        <div className="panel-body">
          <h4>
            <Link to="/">
              <span className="glyphicon glyphicon-th-list" aria-hidden="true"></span>
              Bookstore</Link>
          </h4>
          <div className="row">
            <div className="col-md-4">
              <img src={this.state.book.image_url}/>
            </div>
            <div className="col-md-8">
              <p>{this.state.book.description}</p>
              <ul className="list-group">
                <li className="list-group-item">
                  <strong>Genre: </strong>
                  {this.state.book.genre}</li>
                <li className="list-group-item">
                  <strong>Author: </strong>
                  {this.state.book.author}</li>
                <li className="list-group-item">
                  <strong>Publisher: </strong>
                  {this.state.book.publisher}</li>
                <li className="list-group-item">
                  <strong>Pages: </strong>
                  {this.state.book.pages}</li>
              </ul>
              <a target="_blank" href={this.state.book.buy_url} className="btn btn-primary">Buy Now</a>
              <div className="pull-right">
                <Link to={`/edit_book/${this.state.book._id}`} className="btn btn-success">Edit</Link>&nbsp;
                <button onClick={this.delete.bind(this, this.state.book._id)} className="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
}

export default Details;
