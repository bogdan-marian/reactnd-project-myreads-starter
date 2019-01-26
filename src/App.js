import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BookSelf extends React.Component {
  render() {
    const { books, shelfTitle, changeSelf } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <BookList
            books={books}
            changeSelf={changeSelf}
          />
        </div>
      </div>
    )
  }
}

class BookItem extends React.Component {
  render() {
    const { book, changeSelf } = this.props;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select onChange={(e) => { changeSelf(book.id, e.target.value) }} value="move">
                <option value="move" disabled >Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          {book.authors.map(author => <div className="book-authors" key={author}>{author}</div>)}
        </div>
      </li>
    )
  }
}

class BookList extends React.Component {
  render() {
    const { books, changeSelf } = this.props;
    return (
      <ol className="books-grid">
        {books.map(b => <BookItem key={b.title} book={b} changeSelf={changeSelf} />)}
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
          <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
        </div>
      </div>
    )
  }
}

export default BooksApp
