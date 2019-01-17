import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class BookSelf extends React.Component {
  render() {
    const bself = this.props.bself;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{bself}</h2>
        <div className="bookshelf-books">
          <BookList books={[
          { title: 'book 1 '},
          { title: 'book 2' },
          { title: 'book 3 '}
        ]} />
        </div>
      </div>
    )
  }
}

class BookList extends React.Component {
  render() {
    const books = this.props.books;
    return (
      <ol className="books-grid">
        {books.map((book) => (
          <li key={book.title}>{book.title}</li>
        ))}
      </ol>
    )
  }
}

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookSelf />
          </div>
        </div>
        <div className="open-search">
          <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
        </div>
      </div>
    )
  }
}

export default BooksApp
