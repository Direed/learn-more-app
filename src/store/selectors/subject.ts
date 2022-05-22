import {createSelector} from "reselect";
import {IRootReducer} from "../reducers";

const getState = (state:IRootReducer) => state.subject;

export const getSubject = createSelector(getState, (subject) => subject.subject)
