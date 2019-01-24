import React from 'react';
// import * as BooksAPI from './BooksAPI'
import './App.css';

class BookSelf extends React.Component {
  render() {
    const { id, books, onBookClick } = this.props;

    return (
      <div className='bookshelf'>
        <h2 className='bookshelf-title'>{id}</h2>
        <BookList
          books={books}
          onClick={bookId => {
            onBookClick(bookId, id);
          }}
        />
      </div>
    );
  }
}

class BookList extends React.Component {
  render() {
    const { books, onClick } = this.props;
    return (
      <ol className='books-grid'>
        {books.map(book => (
          <li
            key={book.id}
            onClick={() => {
              onClick(book.id);
            }}
          >
            {book.name}
          </li>
        ))}
      </ol>
    );
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
    return objectArray.reduce(function(acc, obj) {
      var key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }

  onBookClick = (bookId, shelfId) => {
    let { books } = this.state;

    let newShelfId = 'a';
    if (shelfId === 'a') {
      newShelfId = 'b';
    }

    let newBooks = books.map(book => {
      if (book.id === bookId) {
        book.shelf = newShelfId;
      }
      return book;
    });
    this.setState({
      books: newBooks
    });
  };

  render() {
    console.log(this.groupBy(this.state.books, 'shelf'));

    const processedData = this.groupBy(this.state.books, 'shelf');
    const shelves = Object.keys(processedData).map(key => {
      const books = processedData[key];
      return (
        <BookSelf
          key={key}
          id={key}
          books={books}
          onBookClick={this.onBookClick}
        />
      );
    });
    return (
      <div className='list-books'>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>
        <div className='list-books-content'>
          <div>{shelves}</div>
        </div>
        <div className='open-search'>
          <button onClick={() => this.setState({ showSearchPage: true })}>
            Add a book
          </button>
        </div>
      </div>
    );
  }
}

export default BooksApp;