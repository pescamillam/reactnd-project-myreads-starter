import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';

class Book extends Component {

  changeShelf(e) {
    let book = this.props.book;
    book.shelf = event.target.value;
    BooksAPI.update(book, e.target.value);
    this.props.onUpdateBook(book, e.target.value);
  }

  render() {
    const book = this.props.book;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.smallThumbnail : ''})` }}></div>
            <div className="book-shelf-changer">
              <select
                  onChange={(event) => this.changeShelf(event)}
                  defaultValue={book.shelf}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors ? book.authors.join(', ') : ""}</div>
        </div>
      </li>
    );
  }
}

export default Book;
