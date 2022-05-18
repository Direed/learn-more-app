import {combineReducers} from "redux";
import {authReducer, AuthState} from "./auth";
import {topicReducer, TopicState} from "./topic";
import {subjectReducer, SubjectState} from "./subject";

export interface IRootReducer {
    auth: AuthState,
    topic: TopicState,
    subject: SubjectState,
}

export const rootReducer = combineReducers<IRootReducer>({
    auth: authReducer,
    topic: topicReducer,
    subject: subjectReducer,
})
