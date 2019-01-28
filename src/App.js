import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookSelf from './BookSelf'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import SearchMain from './SearchMain'




class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({ books }))
      })
  }

  groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
      var key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }

  changeSelf = (bookId, shelfId) => {
    console.log("changeSelf: " + bookId + " / " + shelfId)
    let { books } = this.state;
    let newBooks = books.map(book => {
      if (book.id === bookId) {
        book.shelf = shelfId;
      }
      return book;
    })
    this.setState({
      books: newBooks
    })
  }

  render() {
    const processedData = this.groupBy(this.state.books, 'shelf');
    const shelves = Object.keys(processedData).map(key => {
      const books = processedData[key];
      console.log('mybooks ' + books);
      return (
        <BookSelf
          key={key}
          shelfTitle={key}
          books={books}
          changeSelf={this.changeSelf}
        />
      );
    });

    return (
      <div>
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {shelves}
              </div>
            </div>
            <div className="open-search">
              <Link
                to='/search'>
                <button >Add a book</button>
              </Link>
            </div>
          </div>
        )} />
        <Route exact path='/search' component={SearchMain} />
      </div>
    )
  }
}

export default BooksApp
