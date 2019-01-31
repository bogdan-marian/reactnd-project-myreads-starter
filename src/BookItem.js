import React, {Component} from 'react'



class BookItem extends React.Component {
  render() {
    const { book, changeSelf } = this.props;

    let authors; //sometimes wee have to double check if wee have authors
    if (book.authors && book.authors.length > 0){
      authors = book.authors.map(author => <div className="book-authors" key={author}>{author}</div>)
    }

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
            {authors}
        </div>
      </li>
    )
  }
}

export default BookItem