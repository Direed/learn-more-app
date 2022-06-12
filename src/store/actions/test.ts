import testConstants from '../constants/test'

export const setAnswers = (answers: any) => ({
    type: testConstants.SET_ANSWERS,
    payload: answers,
})

export const startTest = (tests: any) => ({
    type: testConstants.START_TEST,
    payload: tests,
})

export const completeTest = (payload: any) => ({
    type: testConstants.COMPLETE_TEST,
    payload: payload,
})

export const closeTest = () => ({
    type: testConstants.CLOSE_TEST,
})

export const setCurrentTest = (currentTest: any) => ({
    type: testConstants.SET_CURRENT_TEST,
    payload: currentTest,
})

export const clearTopic = () => ({
    type: testConstants.CLEAR_TOPIC,
})
