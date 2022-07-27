import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ForecastDay} from "../../models/forecast";
import * as R from "ramda";
import {Location} from "../../models/location";
import {Current} from "../../models/current";

interface IWeather {
    forecast?: ForecastDay[]
    location?: Location;
    current?: Current;
}

interface WeatherState {
    loading: boolean;
    weather?: IWeather;
}

const initialState: WeatherState = {
    loading: false,
    weather: {} as IWeather
}

const weathersSlice = createSlice({
    name: 'weathers',
    initialState,
    reducers: {
        triggerUpdateWeather(state, action: PayloadAction<{
            code: number;
        }>) {
            state.loading = true
        },
        updateWeather: (
            state,
            action: PayloadAction<RecursivePartial<WeatherState>>
        ) => R.mergeDeepRight(state, action.payload) as WeatherState
    }
})

type ValueOf<T> = T[keyof T];
type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};

export type ForecastsActionsType = ReturnType<ValueOf<typeof weathersSlice.actions>>;
export const {triggerUpdateWeather, updateWeather} = weathersSlice.actions;
export const weathersReducer = weathersSlice.reducer;
