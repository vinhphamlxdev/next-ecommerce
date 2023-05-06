import {
  combineReducers,
  configureStore,
  createSerializableStateInvariantMiddleware,
} from "@reduxjs/toolkit";
import globalReducer from "./features/globalSlice";

const reducer = combineReducers({
  global: globalReducer,
});
export const store = configureStore({
  reducer,
  middleware: [],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
