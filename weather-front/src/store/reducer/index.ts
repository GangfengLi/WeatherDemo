import {combineReducers} from "redux";
import forecast from "./forecast";
import current from "./current";

export default combineReducers({forecast: forecast, current: current})
