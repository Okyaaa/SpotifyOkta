const initialState = { value: "" };

function tokenReducer(state = initialState, action) {
  switch (action.type) {
    case "token":
      return { ...state, value: action.payload };
    default:
      return state;
  }
}

export default tokenReducer;
