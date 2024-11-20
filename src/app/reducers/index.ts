import { routerReducer } from "@ngrx/router-store";
import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { environment } from "../../environments/environment";

export interface AppState {

}

export const reducers: ActionReducerMap<AppState> = {
    router: routerReducer
};
// this is the custom reducer  
export function logger(reducer:ActionReducer<any>)
    : ActionReducer<any> {
    return (state, action) => {
        // console.log("state before: ", state);
        // console.log("action", action);

        return reducer(state, action);
    }

}
// meta reducers are the reducers which executes before the main reducer
export const metaReducers: MetaReducer<AppState>[] =
    !environment.production ? [logger] : [];