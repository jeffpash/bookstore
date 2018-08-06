import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allgenres: [],
      book: {}
    };

      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  }

  // componentDidMount() {
  //   axios.get('/api/genres').then(res => {
  //     this.setState({allgenres: res.data});
  //     console.log(this.state.allgenres);
  //   });
  // }
  componentDidMount() {
    axios.get('/api/books/' + this.props.match.params.id).then(res => {
      this.setState({book: res.data});
      console.log(this.state.book);
    });
    axios.get('/api/genres').then(res => {
      this.setState({allgenres: res.data});
      console.log(this.state.allgenres);
    });
  }

  onChange(e) {
    const state = this.state.book
    state[e.target.name] = e.target.value;
    this.setState({book: state});
  }

  onSubmit(e) {
    e.preventDefault();

    const { title, genre, description, author, publisher, pages, image_url, buy_url } = this.state.book;

    axios.put('/api/books/' + this.props.match.params.id,
    {title, genre, description, author, publisher, pages, image_url, buy_url})

      .then((result) => {
      this.props.history.push("/book_details/" + this.props.match.params.id)
    });
  }

  render() {
    return (<div className="container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">
            EDIT BOOK
          </h3>
        </div>
        <div className="panel-body">
          <h4>
            <Link to={`/book_details/${this.state.book._id}`}>
              <span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
              Book Details</Link>
          </h4>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input type="text" className="form-control" name="title" value={this.state.book.title} onChange={this.onChange} placeholder="Title"/>
            </div>
            <div className="form-group">
               <label htmlFor="genre">Genre:</label>
              <select  className="form-control" name="genre" value={this.state.book.genre} onChange={this.onChange}>
                {
                  this.state.allgenres.map(genre => {
                    return (<option value={genre._id} key={genre._id}>
                      {genre.name}
                    </option>)
                  })
                };
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="author">Author:</label>
              <input type="text" className="form-control" name="author" value={this.state.book.author} onChange={this.onChange} placeholder="Author"/>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <input type="text" className="form-control" name="description" value={this.state.book.description} onChange={this.onChange} placeholder="Description"/>
            </div>
            <div className="form-group">
              <label htmlFor="publisher">Publisher:</label>
              <input type="text" className="form-control" name="publisher" value={this.state.book.publisher} onChange={this.onChange} placeholder="Publisher"/>
            </div>
            <div className="form-group">
              <label htmlFor="pages">Pages:</label>
              <input type="number" className="form-control" name="pages" value={this.state.book.pages} onChange={this.onChange} placeholder="Pages"/>
            </div>
            <div className="form-group">
              <label htmlFor="image_url">Image_url:</label>
              <input type="text" className="form-control" name="image_url" value={this.state.book.image_url} onChange={this.onChange} placeholder="Image_url"/>
            </div>
            <div className="form-group">
              <label htmlFor="buy_url">Buy_url:</label>
              <input type="text" className="form-control" name="buy_url" value={this.state.book.buy_url} onChange={this.onChange} placeholder="Buy_url"/>
            </div>
            <button type="submit" className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>
    </div>);
  }
}

export default Edit;
