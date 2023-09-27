import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./reducers/movie_reducer";
import clientSlice from "./reducers/client_reducer";
import boardSlice from "./reducers/board_reducer";
import reviewSlice from "./reducers/review_reducer";

const store = configureStore({
  reducer: {
    movies: movieSlice.reducer,
    clients: clientSlice.reducer,
    board: boardSlice.reducer,
    reviews: reviewSlice.reducer
  },
});

export default store;
