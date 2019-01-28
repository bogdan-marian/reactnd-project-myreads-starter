import React, {Component} from 'react'
import BookItem from './BookItem'

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

export default BookList