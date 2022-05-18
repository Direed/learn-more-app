import {createSelector} from "reselect";
import {IRootReducer} from "../reducers";

const getState = (state: IRootReducer) => state.auth;

export const getUser = createSelector(getState, (auth) => auth.user)

export const getMainBgColor = createSelector(getState, (auth) => auth.mainBgColor)

export const getActiveRoute = createSelector(getState, (auth) => auth.activeRoute)
