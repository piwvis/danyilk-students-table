import { configureStore } from '@reduxjs/toolkit'
import studentsReducer from "./reducers/studentsSlice";
import {studentsApi} from "../api/Api";

export const store = configureStore({
    reducer: {
        [studentsApi.reducerPath]: studentsApi.reducer,
        students: studentsReducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(studentsApi.middleware),
})