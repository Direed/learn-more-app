import {createSelector} from "reselect";
import {IRootReducer} from "../reducers";

const getState = (state: IRootReducer) => state.progress;

export const getSubjectProgress = createSelector(getState, (progress) => progress.subject)

export const getTopicProgress = createSelector(getState, (progress) => progress.topic)
