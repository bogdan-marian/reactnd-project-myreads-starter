import React, { Component } from 'react'
import BookItem from './BookItem'

class BookList extends React.Component {
  render() {
    const { books, changeSelf, allBooks } = this.props;
    return (
      <ol className="books-grid">
        {books.map(b => <BookItem
          key={b.id}
          book={b}
          changeSelf={changeSelf}
          allBooks={allBooks} />)}
      </ol>
    )
  }
}

export default BookList