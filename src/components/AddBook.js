import React, { useState } from "react";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from "../queries/queries";
import { useDispatch } from "react-redux";
import { addBookAction } from "../actions";
import { useQuery, useMutation } from "@apollo/react-hooks";

function AddBook(props) {
  const [newBook, setNewBook] = useState([]);

  const dispatch = useDispatch();

  const { loading, data } = useQuery(getAuthorsQuery);

  const [addBookToDB, { error }] = useMutation(addBookMutation);

  if (loading) return <p>Loading authors...</p>;
  if (error) {
    console.log("error:", error);
    return <p>Error :(</p>;
  }

  const displayAuthors = data.authors.map(({ name, id }) => (
    <option key={id} value={id}>
      {name}
    </option>
  ));

  const handleSubmit = event => {
    event.preventDefault();
    console.log(newBook);
    dispatch(addBookAction(newBook));
    addBookToDB({
      variables: {
        name: newBook.name,
        genre: newBook.genre,
        authorid: newBook.authorid
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  };

  const handleChange = event => {
    event.preventDefault();
    setNewBook({ ...newBook, [event.target.name]: event.target.value });
  };

  return (
    <form id="add-book" onSubmit={handleSubmit.bind(props)}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" required name="name" onChange={handleChange} />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input type="text" required name="genre" onChange={handleChange} />
      </div>

      <div className="field">
        <label>Author:</label>
        <select name="authorid" required onChange={handleChange}>
          <option></option>
          {displayAuthors}
        </select>
      </div>
      <button>+</button>
    </form>
  );
}

export default AddBook;

/*
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";

class AddBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      author: ""
    };
  }

  displayAuthors() {
    var data = this.props.getAuthorsQuery;
    if (data.loading) {
      return <option disabled>Loading authors...</option>;
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  }

  submitForm(e) {
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorid: this.state.authorid
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  }

  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Book name:</label>
          <input
            type="text"
            required
            onChange={e => this.setState({ name: e.target.value })}
          />
        </div>

        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            required
            onChange={e => this.setState({ genre: e.target.value })}
          />
        </div>

        <div className="field">
          <label>Author:</label>
          <select onChange={e => this.setState({ authorid: e.target.value })}>
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}
export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook); */
