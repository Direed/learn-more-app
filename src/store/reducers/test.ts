import testConstants from '../constants/test'
export interface TestState {
    answers: any,
    tests: any,
    isStartTest: boolean,
    currentTest: number,
    isResultTest: boolean,
    result: any,
}

const initialState: TestState = {
    answers: null,
    tests: null,
    isStartTest: false,
    currentTest: 0,
    isResultTest: false,
    result: {}
}

export const testReducer = (state = initialState, action: any) => {
    const {type, payload} = action
    switch(type) {
        case testConstants.SET_ANSWERS:
            return {
                ...state,
                answers: payload,
            }
        case testConstants.START_TEST:
            return {
                ...state,
                isStartTest: true,
                tests: payload,
            }
        case testConstants.COMPLETE_TEST:
            return {
                ...state,
                isStartTest: false,
                currentTest: 0,
                isResultTest: true,
                result: {
                    ...payload
                }
            }
        case testConstants.CLOSE_TEST:
            return {
                ...state,
                answers: null,
                tests: null,
                isStartTest: false,
                currentTest: 0,
                isResultTest: false,
                result: {}
            }
        case testConstants.SET_CURRENT_TEST:
            return {
                ...state,
                currentTest: payload,
            }
        case testConstants.CLEAR_TOPIC:
            return {
                answers: null,
                tests: null,
                isStartTest: false,
                currentTest: 0,
                isResultTest: false,
                result: {}
            }
        default:
            return state;
    }
}
