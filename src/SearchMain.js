import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchMain extends Component {

  state ={
    books: []
  }

  queryChange(event){
    
    let query = event.target.value
    console.log(query)
    if (query !==''){
      
      // BooksAPI.search(query).then((books) => {
      //   console.log("search books: " + books)
      // })
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>

          <div className="search-books-input-wrapper">
            {/*
        NOTES: The search from BooksAPI is limited to a particular set of search terms.
        You can find these search terms here:
        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
        you don't find a specific author or title. Every search is limited by search terms.
      */}
            <input type="text" placeholder="Search by title or author" onChange={evt => this.queryChange(evt)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="bokos-grid"></ol>
        </div>
      </div>
    )
  }
}

export default SearchMain