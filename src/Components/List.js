import React, { Component } from "react";
// import { movies } from './getMovies'
import axios from 'axios'

export default class List extends Component {
  
  constructor() {
    super();
    this.state = {
      hover: "",
      parr:[1],
      currPage:1,
      movies:[],
      favMov:[]
    };
  }

  handleEnter =(id) => {
    this.setState({
      hover:id,
    })
  };

  handleLeave = () => {
    this.setState({
      hover:'',
    })
   }

  
   changeMovies = async() => {
    console.log(this.state.currPage);
    console.log("changeMovies called");
    let ans = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=a7e10c48ab7b9a54a36e973edeaed410&language=en-US&page=${this.state.currPage}`
    );

    this.setState({
      movies:[...ans.data.results]
    })
   }

   handleNext =() =>{
    let tempArr = [];
    for(let i = 1 ; i <=this.state.parr.length +1 ; i++) {
      tempArr.push(i);
    }

  
    this.setState({
      parr:[...tempArr],
      currPage:this.state.currPage +1
    },this.changeMovies);

    
   }

   handlePrevious = () => {
    if(this.state.currPage != 1){
      this.setState({
        currPage : this.state.currPage - 1,
      },this.changeMovies)
    }
   }

   handlePageNum = (pageNum) => {
    if(pageNum != this.state.currPage) {
      this.setState({
        currPage: pageNum,
      },this.changeMovies);
    }
   }
 
   handleFavourites = (movieObj) => {
    let localStorageMovies = JSON.parse(localStorage.getItem("movies")) || [];

    if(this.state.favMov.includes(movieObj.id)) {
      localStorageMovies = localStorageMovies.filter(
        (movie) => movie.id != movieObj.id
      );
    }
    else localStorageMovies.push(movieObj);
    console.log(localStorageMovies);
    localStorage.setItem("movies",JSON.stringify(localStorageMovies));
    let tempData = localStorageMovies.map(movieObj => movieObj.id);
    this.setState({
      favMov :[...tempData]
    })
   }









  async componentDidMount() {
    let ans = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=a7e10c48ab7b9a54a36e973edeaed410&language=en-US&page=${this.state.currPage}`
    );
    // console.log(ans.data)
    this.setState({
      movies:[...ans.data.results]
    })
  }



  render() {
    // let movie = movies.results;
    return (
      <>
    {this.state.movies.length ==0 ?(
         <div className="spinner-grow text-success" role="status">
         <span className="visually-hidden">Loading...</span>
       </div>
    ) :(
        <div>
            <h3 className="text-center">
               <strong>Trending</strong>
            </h3>
            <div className="movies-list">
                {this.state.movies.map((movieObj) =>(
                   <div
                   className="card movie-card"
                   onMouseEnter={() => this.handleEnter(movieObj.id)}
                   onMouseLeave={this.handleLeave}
                 >
                    <img
                    src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                    className="card-img-top banner-img"
                    alt="..."
                    style={{ height: "40vh" }}
                  />
                  <h5 className="card-title movie-title">
                    {movieObj.original_title}
                  </h5>
                  <div className="button-wrapper">
                  {this.state.hover == movieObj.id && (
                      <a href="#" class="btn btn-danger movie-button" onClick={() => this.handleFavourites(movieObj)}>
                        {this.state.favMov.includes(movieObj.id)?"Remove from Favourites" :"Add to Favourites"}
                      </a>
                    ) }
                  </div>
                  </div>
                ))}
           </div> 
           <div className="pagination">
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item">
                    <a class="page-link" onClick={this.handlePrevious}>
                      Previous
                    </a>
                  </li>
                 {
                  this.state.parr.map(pageNum => (
                    <li class="page-item">
                          <a class="page-link" onClick={() => this.handlePageNum(pageNum)}>
                            {pageNum}
                          </a>
                        </li>
                  ))
                 }
                  <li class="page-item">
                    <a class="page-link" onClick={this.handleNext}>
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
        </div>
    )}

      </>
    );
  }
}





//https://api.themoviedb.org/3/movie/550?api_key=a7e10c48ab7b9a54a36e973edeaed410
// https://api.themoviedb.org/3/movie/550?api_key=a7e10c48ab7b9a54a36e973edeaed410
//"https://api.themoviedb.org/3/movie/popular?api_key=a7e10c48ab7b9a54a36e973edeaed410&language=en-US&page=1"

