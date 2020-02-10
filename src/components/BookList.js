import React, { useState } from "react";
import { getBooksQuery } from "../queries/queries";
//import { graphql } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import BookDetails from "./BookDetails";

function BookList() {
  const [selected, setSelected] = useState(null);

  const { loading, error, data } = useQuery(getBooksQuery);

  if (loading) return <p>Loading books...</p>;
  if (error) {
    console.log("error:", error);
    return <p>Error :(</p>;
  }

  const displayBooks = data.books.map(({ name, id }) => (
    <li
      key={id}
      onClick={event => {
        setSelected({ id });
      }}
    >
      {name}
    </li>
  ));

  return (
    <div>
      <ul id="book-list">{displayBooks}</ul>
      <BookDetails bookid={selected} />
    </div>
  );
}

export default BookList;

/*class BookList extends React.Component {
  displayBooks() {
    var data = this.props.data;
    if (data.loading) {
      return <p>Loading books...</p>;
    } else {
      return data.books.map(book => {
        return <li key={book.id}>{book.name}</li>;
      });
    }
  }

  render() {
    console.log(this.props);

    return (
      <div>
        <ul id="book-list">{this.displayBooks()}</ul>
        <BookDetails />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList); */
