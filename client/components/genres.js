import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

class Genres extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allgenres: []
    };
  }

  componentDidMount() {
   axios.get('/api/genres')
     .then(res => {
       this.setState({ allgenres: res.data });
       console.log(this.state.allgenres);
     });
   }

   render() {
     return(
       <div className="container">
         <h4><Link to="/"><span className="glyphicon glyphicon-th-list"
           aria-hidden="true"></span> Bookstore</Link></h4>
         <div className="row">
       <div className="panel panel-default">
         <div className="panel-heading">
           <h3 className="panel-title">Genre List</h3>
         </div>
         <div className="panel-body">
           <div className="row">
             {
               this.state.allgenres.map(genre => {
                 return (<div className="book col-md-6" key={genre._id}>
                   <h3>{genre.name}</h3>
               </div>)})
             };
           </div>
         </div>
       </div>
     </div>
       </div>
     );
   }
 };

export default Genres;
