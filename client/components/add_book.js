import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Link, withRouter} from 'react-router-dom';

class AddBook extends Component {
  constructor() {
    super();
    this.state = {
      allgenres: [],
      title: '',
      genre: '',
      description: '',
      author: '',
      publisher: '',
      pages: '',
      image_url: '',
      buy_url: ''
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  onChange(e) {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  handleSubmit(e) {
    e.preventDefault();

    const {
      title,
      genre,
      description,
      author,
      publisher,
      pages,
      image_url,
      buy_url
    } = this.state;

    axios.post('/api/books', {
      title,
      genre,
      description,
      author,
      publisher,
      pages,
      image_url,
      buy_url
    }).then((res) => {
      this.props.history.push('/')
      console.log(res);
    }).catch((error) => {
      console.log(error);
    });
  }
  componentDidMount() {
    axios.get('/api/genres').then(res => {
      this.setState({allgenres: res.data});
      console.log(this.state.allgenres);
    });
  }

  render() {
    const {
      title,
      genre,
      description,
      author,
      publisher,
      pages,
      image_url,
      buy_url
    } = this.state;
    return (<div className="container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">
            ADD BOOK
          </h3>
        </div>
        <div className="panel-body">
          <h4>
            <Link to="/">
              <span className="glyphicon glyphicon-th-list" aria-hidden="true"></span>
              Book List</Link>
          </h4>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input type="text" className="form-control" name="title" value={title} onChange={this.onChange} placeholder="Title"/>
            </div>
            <div className="form-group">
              <label htmlFor="genre">Genre:</label>
              <select className="form-control" name="genre" value={genre} onChange={this.onChange}>
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
              <input type="text" className="form-control" name="author" value={author} onChange={this.onChange} placeholder="Author"/>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textArea className="form-control" name="description" value={description} onChange={this.onChange} placeholder="Description" cols="80" rows="3">{description}</textArea>
            </div>
            <div className="form-group">
              <label htmlFor="publisher">Publisher:</label>
              <input type="text" className="form-control" name="publisher" value={publisher} onChange={this.onChange} placeholder="Publisher"/>
            </div>
            <div className="form-group">
              <label htmlFor="pages">Pages:</label>
              <input type="number" className="form-control" name="pages" value={pages} onChange={this.onChange} placeholder="Pages"/>
            </div>
            <div className="form-group">
              <label htmlFor="image_url">Image_url:</label>
              <input type="text" className="form-control" name="image_url" value={image_url} onChange={this.onChange} placeholder="Image_url"/>
            </div>
            <div className="form-group">
              <label htmlFor="buy_url">Buy_url:</label>
              <input type="text" className="form-control" name="buy_url" value={buy_url} onChange={this.onChange} placeholder="Buy_url"/>
            </div>
            <button type="submit" className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>
    </div>);
  }
}

export default withRouter(AddBook);
