import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BookSelf extends React.Component {
  render() {
    const { books, shelfTitle, shelfTitles } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <BookList
            books={books}
          />
        </div>
      </div>
    )
  }
}

class BookList extends React.Component {
  render() {
    const { books } = this.props;
    console.log("BookList books = " + books)
    return (
      <ol className="books-grid">
        {books.map(book => (
          <li key={book.id}>
            {book.name}
          </li>
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
    books:[]
    // books: [
    //   {
    //     id: 'book1',
    //     name: 'book 1',
    //     shelf: 'a'

    //   },
    //   {
    //     id: 'book2',
    //     name: 'book 2',
    //     shelf: 'a'
    //   },
    //   {
    //     id: 'book3',
    //     name: 'book 3',
    //     shelf: 'b'
    //   }
    // ]
  };

  componentDidMount(){
    BooksAPI.getAll()
      .then((books)=>{
        this.setState(()=>({books}))
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
  };

  render() {
    console.log("Books: " + this.state.books);
    const processedData = this.groupBy(this.state.books, 'shelf');
    const shelfTitles = Object.keys(processedData);
    const shelves = Object.keys(processedData).map(key => {
      const books = processedData[key];
      return (
        <BookSelf
          key={key}
          shelfTitle={key}
          shelfTitles
          books={books}
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
