import bookReducer from "./book";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  book: bookReducer
});

export default allReducers;
