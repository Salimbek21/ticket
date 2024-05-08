import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./auth/loginSlice";
import { sliderReducer } from "./slider/sliderSlice";
import { premierMoviesReducer } from "./premierMovies/premierMoviesSlice";
import { upComingSliceReducer } from "./upComingMovies/upComingMoviesSlice";
import { cinemasReducer } from "./cinemas/cinemasSlice";
import { filmsReducer } from "./films/filmsSlice";

const rootReducer = combineReducers({
  login: loginReducer,
  slider: sliderReducer,
  premierMoviesWeekly: premierMoviesReducer,
  upComingMovies: upComingSliceReducer,
  cinemas: cinemasReducer,
  films: filmsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
