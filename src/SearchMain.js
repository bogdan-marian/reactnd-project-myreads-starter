import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookList from './BookList'

class SearchMain extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    books: []
  }

  queryChange(event) {

    let query = event.target.value
    if (query !== '') {
      BooksAPI.search(query).then((books) => {
        if (books && books.length > 0) {
          let foundBooks = books.filter((book) => (book.imageLinks && book.imageLinks.thumbnail))
          this.setState({ books: foundBooks })
        }
      })
    }
  }

  // addBokToShelf = (bookId, shelfId) => {
  //   console.log("justChangeShelf");
  // }

  render() {
    const { addBookToShelf } = this.props;
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
            <input type="text" placeholder="Search by title or author" onChange={evt => this.queryChange(evt)} />
          </div>
        </div>
        <div className="search-books-results">
          <BookList
            books={this.state.books}
            changeSelf={addBookToShelf}
          />
        </div>
      </div>
    )
  }
}

export default SearchMain