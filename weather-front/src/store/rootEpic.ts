import {combineEpics} from "redux-observable";
import {updateWeatherEpic} from "./slices/weatherEpic";

export const rootEpic = combineEpics(updateWeatherEpic)
