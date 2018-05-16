import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import Genres from './genres';
import Books from './books';
import AddBook from './add_book';
import Details from './book_details';
import Edit from './edit_book';

class Bookstore extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Books}/>
          <Route exact path='/genres' component={Genres}/>
          <Route exact path='/add_book' component={AddBook}/>
          <Route exact path='/book_details/:id' component={Details}/>
          <Route exact path='/edit_book/:id' component={Edit}/>
        </Switch>
    </Router>);
  };
}

export default Bookstore;
