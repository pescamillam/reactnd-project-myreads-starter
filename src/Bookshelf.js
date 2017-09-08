import React, { Component } from 'react';
import Book from './Book'

class Bookshelf extends Component {
  render() {
    const books = this.props.books.filter((book) => book.shelf === this.props.shelf);
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) =>
              <Book book={book} key={book.id} onUpdateBook={this.props.onUpdateBook}/>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;
