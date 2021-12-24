import React from "react";
import BookService from "../services/BookService";
import { Card, CardContainer } from "../styles/CardComponent";
import { getIdFromUrl } from "../utils";
import Page from "./shared/Page";
import Pagination from "./shared/Pagination";

export default class BooksComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      books: [],
    };
  }
  componentDidMount() {
    this.loadBooks(1);
  }

  handleCardClick = (book) => {
    const bookId = getIdFromUrl(book.url);
    this.props.history.push(`/book/${bookId}`);
  };

  loadBooks = ({ page }) => {
    BookService.getAllBooks(page).then((result) => {
      this.setState({
        books: result,
      });
    });
  };

  render() {
    return (
      <Page>
        <h1>Books</h1>
        <CardContainer>
          {this.state.books.map((book, index) => (
            <Card key={index} onClick={this.handleCardClick.bind(this, book)}>
              <h2> {book.name} </h2>
              <p>{book.numberOfPages}</p>
            </Card>
          ))}
        </CardContainer>
        <Pagination handlePagination={this.loadHouses} noOfPages={12} />
      </Page>
    );
  }
}
