import React, {Component} from 'react'
import BookList from './BookList'

class BookSelf extends React.Component {
  render() {
    const { books, shelfTitle, changeSelf, allBooks } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <BookList
            books={books}
            changeSelf={changeSelf}
            allBooks = {allBooks}
          />
        </div>
      </div>
    )
  }
}

export default BookSelf