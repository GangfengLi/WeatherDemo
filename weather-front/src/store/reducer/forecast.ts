import {ForecastDay} from "../../models/forecast";

export interface IForecast {
    forecast?: ForecastDay[]
}

interface IForecastState {
    forecast: IForecast
}

const initForecastState: IForecastState = {
    forecast: {}
}

export enum IForecastAction {
    INIT,
    CHANGE
}

const forecast = (state: IForecastState = initForecastState, action: { type: IForecastAction, payload: any }) => {
    switch (action.type){
        case IForecastAction.INIT:
            return state;
        case IForecastAction.CHANGE:
            return {...state,...action.payload}
        default:
            return state;
    }
}

export default forecast;
