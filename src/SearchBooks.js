import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';
import createHistory from 'history/createBrowserHistory';

class SearchBooks extends Component {

  state = {
    query: '',
    books: []
  }

  updateQuery(query) {
    this.setState({ query: query.trim() });
    if (query.trim().length > 0) {
      BooksAPI.search(query.trim()).then((books) => {
        this.setState({
          books: books.error ? [] : books.map((book) => {
            const myBook = this.props.books.filter((myBook) => book.id === myBook.id)[0];
            book.shelf = myBook ? myBook.shelf : 'none';
            return book;
          })
        })
      })
    }
    const history = createHistory();
    history.push('/search/?q='+query);
  }

  componentDidMount() {
    const history = createHistory();
    if (history.location.search) {
      const params = this.getUrlParams(history.location.search)
      this.updateQuery(params["q"]);
    }
  }

  getUrlParams(paramsString) {
    return paramsString.substring(1).split("&").reduce(function(map, obj) {
      map[obj.split("=")[0]] = obj.split("=")[1];
      return map;
    }, {});
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books && Array.isArray(this.state.books) && this.state.books.map((book) =>
              <Book book={book} key={book.id} onUpdateBook={this.props.onUpdateBook}/>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
