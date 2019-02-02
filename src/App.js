import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookSelf from './BookSelf'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import SearchMain from './SearchMain'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

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

  addNewBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then((bookResponse) => {
        book.shelf = shelf
        let newBooks = this.state.books.concat([book])
        this.setState({
          books: newBooks
        })
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

  changeSelf = (bookItem, shelfId) => {
    let { books } = this.state;
    let isNewBook = true;
    let newBooks = books.map(book => {
      if (book.id === bookItem.id) {
        book.shelf = shelfId;
        isNewBook = false; //is not a new book wee found it on the shelfs
      }
      return book;
    })
    toast("Adding [" + bookItem.title + "] book to [" + this.shelfNames[shelfId]+"] shelf");
    if (isNewBook) {
      this.addNewBook(bookItem, shelfId)
    } else {
      BooksAPI.update(bookItem, shelfId).then((bookResponse) => {
        this.setState({
          books: newBooks
        })
      })

    }
  }

  shelfNames = {
    "currentlyReading": "Currently Reading",
    "wantToRead": "Want to Read",
    "read": "Read"
  }

  orderDictionary = {
    "currentlyReading": 1,
    "wantToRead": 2,
    "read": 3
  }

  compareShelfs = (a, b) => {
    if (this.orderDictionary[a.key] < this.orderDictionary[b.key]) {
      return -1
    }
    if (this.orderDictionary[a.key] > this.orderDictionary[b.key]) {
      return 1
    }
    return 0
  }

  render() {
    const processedData = this.groupBy(this.state.books, 'shelf');
    const shelves = Object.keys(processedData).map(key => {
      const books = processedData[key];
      return (
        <BookSelf
          key={key}
          shelfTitle={this.shelfNames[key]}
          books={books}
          changeSelf={this.changeSelf}
          allBooks={this.state.books}
        />
      );
    }).sort(this.compareShelfs);

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
            <ToastContainer />
          </div>
        )} />
        <Route
          exact path='/search'
          // render={(props) => <Dashboard {...props} isAuthed={true} />}
          render={(props) => (<SearchMain {...props} addBookToShelf={this.changeSelf} allBooks={this.state.books}/>)}
        // component={SearchMain} 
        />
      </div>
    )
  }
}

export default BooksApp
