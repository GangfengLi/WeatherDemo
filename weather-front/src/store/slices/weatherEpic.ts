import {Epic} from "redux-observable";
import {ActionsType, RootState} from "../store";
import * as API from "../../apis"
import {catchError, filter, from, map, switchMap, throwError} from "rxjs";
import {triggerUpdateWeather, updateWeather} from "./weatherSlice";
import {message} from "antd";

export const updateWeatherEpic: Epic<ActionsType,
    ReturnType<typeof updateWeather>,
    RootState,
    typeof API>
    = (action$, state$) =>
    action$.pipe(
        filter(triggerUpdateWeather.match),
        switchMap(
            ({payload: {code}}) => {
                return from(API.fetchData(code)).pipe(
                    map((v) =>
                        updateWeather({
                            weather: {
                                location: v.data.location,
                                current: {
                                    temp: v.data.current.temp_c,
                                    condition: v.data.current.condition.text,
                                    icon: 'https:' + v.data.current.condition.icon
                                },
                                forecast: v.data.forecast.forecastday
                            },
                            loading: false
                        })
                    ), catchError(err => {
                        message.error("Failed to fetch weather data")
                        return throwError(err);
                    })
                );
            }
        )
    );
