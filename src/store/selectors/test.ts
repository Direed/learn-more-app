import {createSelector} from "reselect";
import {IRootReducer} from "../reducers";

const getState = (state: IRootReducer) => state.test;

export const getAnswers = createSelector(getState, (test) => test.answers)

export const getTests = createSelector(getState, (test) => test.tests)

export const getIsStartTest = createSelector(getState, (test) => test.isStartTest)

export const getIsResultTest = createSelector(getState, (test) => test.isResultTest)

export const getResultTest = createSelector(getState, (test) => test.result)

export const getCurrentTest = createSelector(getState, (test) => test.currentTest)
