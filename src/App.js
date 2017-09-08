import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';

class BooksApp extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBook(bookToUpdate, shelf) {
    this.setState(
      (prev) => {
        prev.books.map((book) => {
          if (book.id === bookToUpdate.id) {
            book.shelf = shelf;
          }
          return book;
        })
      }
    );
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks books={this.state.books} onUpdateBook={(book, shelf) => this.updateBook(book, shelf)}/>
        )}/>
        <Route path='/search' render={() => (
          <SearchBooks onUpdateBook={(book, shelf) => this.updateBook(book, shelf)}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
