const initialState = {
  mostHighlightList: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_HIGHLIGHT":
      //       localStorage.setItem("highlightedList", action.payload);
      return { ...state, mostHighlightList: action.payload };

    default:
      return { ...state };
  }
};

export default rootReducer;
