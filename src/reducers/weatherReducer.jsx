export const initialState = {
  data: null,
  fetched: false,
  activeMode: "forecast",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, data: action.payload };
    case "SET_FETCHED":
      return { ...state, fetched: action.payload };
    case "SET_ACTIVEMODE":
      return { ...state, activeMode: action.payload };
    default:
      return state;
  }
};
