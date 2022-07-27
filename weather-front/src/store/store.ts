import reducer from "./reducers";
import {configureStore} from "@reduxjs/toolkit";
import {ForecastsActionsType, weathersReducer} from "./slices/weatherSlice";
import {createEpicMiddleware} from "redux-observable";
import * as API from "../apis"
import {rootEpic} from "./rootEpic";

export type ActionsType = |ForecastsActionsType;

const epicMiddleware = createEpicMiddleware<ActionsType, ActionsType, any>({
    dependencies: API,
});

export const store = configureStore({
    reducer: {
        weather: weathersReducer
    },
    middleware: [epicMiddleware]
})

epicMiddleware.run(rootEpic);
export type RootState = ReturnType<typeof reducer>;
