import {combineReducers} from "redux";
import {weathersReducer} from "../slices/weatherSlice";

export default combineReducers({weather: weathersReducer})
