import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookList from './BookList'
import { ToastContainer } from 'react-toastify'
import { DebounceInput } from 'react-debounce-input';

class SearchMain extends Component {
  querryIsValid = false;
  allTerms = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball',
    'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook',
    'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas',
    'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games',
    'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn',
    'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy',
    'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling',
    'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel',
    'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'];
  validator = this.allTerms.join(',').toLowerCase();




  state = {
    books: [],
    badTerms: []
  };

  /**
   * It checks if the query have some bad params
   * @param {*} query 
   */
  getBadTerms(query) {
    let tokens = query.split(" ");
    let terms = [];
    tokens.forEach(element => {

      if (!this.validator.includes(element.toLowerCase())) {
        terms.push(element)
      }
    });
    return terms;
  }

  queryChange(event) {
    this.setState({ books: [], badTerms:[] })
    let query = event.target.value
    query = query.trim()
    if (query === '') {
      this.setState({ books: [] })
      return;
    }

    let badTerms = this.getBadTerms(query);
    if (badTerms.length < 1) {
      BooksAPI.search(query).then((books) => {
        if (books && books.length > 0) {
          let foundBooks = books.filter((book) => (book.imageLinks && book.imageLinks.thumbnail))
          this.setState({ books: foundBooks, badTerms: [] })
        }
      })
    } else {
      this.setState({
        books: [],
        badTerms: badTerms
      })
    }
  }

  render() {
    const { addBookToShelf, allBooks } = this.props;

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
            <DebounceInput type="text" placeholder="Search by title or author" onChange={evt => this.queryChange(evt)} />
          </div>
        </div>
        <div className="search-books-results">
          {(this.state.badTerms.length < 1) ? <BookList
            books={this.state.books}
            changeSelf={addBookToShelf}
            allBooks={allBooks}
          /> :
            <div>You have used some bad search terms:<br></br>
              {this.state.badTerms.join()}
              {<div><br></br>Please use one of this terms: <br></br>{this.validator}</div>}</div>}
        </div>
        <ToastContainer />
      </div>
    )
  }
}

export default SearchMain