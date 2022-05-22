import {createSelector} from "reselect";

const getState = state => state.topic;

export const getTopic = createSelector(getState, (topic) => topic.topic)
