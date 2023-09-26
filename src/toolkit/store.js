import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./reducers/movie_reducer";
import clientSlice from "./reducers/client_reducer";

const store = configureStore({
  reducer: {
    movies: movieSlice.reducer,
    clients: clientSlice.reducer,
  },
});

export default store;
