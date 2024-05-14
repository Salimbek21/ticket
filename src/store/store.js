import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./auth/login/loginSlice";
import { signUpReducer } from "./auth/signUp/signUpSlice";
import { sliderReducer } from "./slider/sliderSlice";
import { premierMoviesReducer } from "./premierMovies/premierMoviesSlice";
import { upComingSliceReducer } from "./upComingMovies/upComingMoviesSlice";
import { cinemasReducer } from "./cinemas/cinemasSlice";
import { filmsReducer } from "./films/filmsSlice";
import { accountReducer } from "./account/accountSlice";

const rootReducer = combineReducers({
  login: loginReducer,
  signUp: signUpReducer,
  slider: sliderReducer,
  premierMoviesWeekly: premierMoviesReducer,
  upComingMovies: upComingSliceReducer,
  cinemas: cinemasReducer,
  films: filmsReducer,
  account: accountReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["login/loginThunk"],
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        ignoredPaths: ["items.dates"],
      },
    }),
});
