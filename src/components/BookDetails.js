import React from "react";
//import { Component } from "react";
import { getBookQuery } from "../queries/queries";
//import { graphql } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";

function BookDetails(props) {
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: props.bookid
  });

  if (loading)
    return (
      <div id="Book-details">
        <p>Loading books...</p>
      </div>
    );
  if (error) {
    console.log("error:", error);
    return <p>Error :(</p>;
  }

  const displayBookDetails = () => {
    const { book } = data;
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author</p>
          <ul className="other-books">
            {book.author.books.map(item => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No book selected...</div>;
    }
  };
  return <div id="Book-details">{displayBookDetails()}</div>;
}

export default BookDetails;

/* class BookDetails extends Component {
  displayBookDetails() {
    const { book } = this.props.data;
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author</p>
          <ul className="other-books">
            {book.author.books.map(item => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No book selected...</div>;
    }
  }
  render() {
    return <div id="Book-details">{this.displayBookDetails()}</div>;
  }
}

export default graphql(getBookQuery, {
  options: props => {
    return {
      variables: props.bookid
    };
  }
})(BookDetails); */
