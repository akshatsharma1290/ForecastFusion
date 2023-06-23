export const initialState = {
    forecastData: [],
    transformsX: [],
    rightRemainingItems: 0,
    leftRemainingItems : 0
  };
  
  export const reducer = (state, action) => {
    switch (action.type) {
      case "SET_FORECAST_DATA":
        return { ...state, forecastData: action.payload };
      case "SET_TRANSFORMS_X":
        return { ...state, transformsX: action.payload };
      case "SET_RIGHT_REMAINING_ITEMS":
        return { ...state, rightRemainingItems: action.payload };
      case "SET_LEFT_REMAINING_ITEMS":
        return { ...state, leftRemainingItems: action.payload };
      default:
        return state;
    }
  };
  