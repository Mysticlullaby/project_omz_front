import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./reducers/movie_reducer";

const store = configureStore({
    reducer: {
        movies: movieSlice.reducer
    }
})


export default store;