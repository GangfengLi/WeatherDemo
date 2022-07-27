import {Location} from "../../models/location";
import {Current} from "../../models/current";

export interface ICurrent {
    location?: Location;
    current?: Current;
}

interface ICurrentState {
    current: ICurrent
}

const initCurrentState: ICurrentState = {
    current: {}
}

export enum ICurrentAction {
    INIT,
    CHANGE
}

const current = (state: ICurrentState = initCurrentState,
                 action: { type: ICurrentAction, payload: any }) => {
    switch (action.type) {
        case ICurrentAction.INIT:
            return state;
        case ICurrentAction.CHANGE:
            return {...state, ...action.payload}
        default:
            return state;
    }
}

export default current;
