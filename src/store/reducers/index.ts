import {combineReducers} from "redux";
import {authReducer, AuthState} from "./auth";
import {topicReducer, TopicState} from "./topic";
import {subjectReducer, SubjectState} from "./subject";
import {testReducer, TestState} from "./test";
import {progressReducer, ProgressState} from "./progress";

export interface IRootReducer {
    auth: AuthState,
    topic: TopicState,
    subject: SubjectState,
    test: TestState,
    progress: ProgressState,
}

export const rootReducer = combineReducers<IRootReducer>({
    auth: authReducer,
    topic: topicReducer,
    subject: subjectReducer,
    test: testReducer,
    progress: progressReducer,
})
