import testConstants from '../constants/test'
export interface TestState {
    answers: any,
    tests: any,
    isStartTest: boolean,
    currentTest: number,
}

const initialState: TestState = {
    answers: null,
    tests: null,
    isStartTest: false,
    currentTest: 0,
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
                answers: null,
                tests: null,
            }
        case testConstants.CLOSE_TEST:
            return {
                ...state,
                isStartTest: false,
                answers: null,
                tests: null,
            }
        case testConstants.SET_CURRENT_TEST:
            return {
                ...state,
                currentTest: payload,
            }
        default:
            return state;
    }
}
