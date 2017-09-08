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
        if (prev.books.filter((book) => book.id === bookToUpdate.id).length > 0) {
          prev.books.map((book) => {
            if (book.id === bookToUpdate.id) {
              book.shelf = shelf;
            }
            return book;
          });
        } else {
          prev.books.push(bookToUpdate);
        }
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
          <SearchBooks books={this.state.books} onUpdateBook={(book, shelf) => this.updateBook(book, shelf)}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
