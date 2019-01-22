import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class BookSelf extends React.Component {
  render() {
    console.log("bookSelf: " + this.props);
    const bselfs = this.props.bselfs;
    return (
      <div className="bookshelf">
        {bselfs.map((bself) => (
          <li key={bself.shelf}>{bself.shelf}</li>
        ))}
        <h2 className="bookshelf-title">{bselfs.c}</h2>
        <div className="bookshelf-books">
          book-list-placeholder
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
    showSearchPage: false,
    books: [
      {
        id: 'book1',
        name: 'book 1',
        shelf: 'a'

      },
      {
        id: 'book2',
        name: 'book 2',
        shelf: 'a'
      },
      {
        id: 'book3',
        name: 'book 3',
        shelf: 'b'
      }
    ]
  };





  groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
      var key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  };

  render() {
    console.log(this.groupBy(this.state.books, 'shelf'))
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookSelf
              bselfs={this.groupBy(this.state.books, 'shelf')}
            />
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
