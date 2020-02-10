const initState = { name: "", genre: "", authorid: "" };

const bookReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADDBOOK":
      return (state = action.payload);
    default:
      return state;
  }
};

export default bookReducer;
