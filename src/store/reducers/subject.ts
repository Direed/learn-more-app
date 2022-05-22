import subjectConstants from '../constants/subject'
export interface SubjectState {
    key: number,
    subject: any,
}

const initialState: SubjectState = {
    key: 0,
    subject: null,
}

export const subjectReducer = (state = initialState, action: any) => {
    const {type, payload} = action
    switch(type) {
        case subjectConstants.SET_SUBJECT:
            return {
                ...state,
                subject: payload
            }
        default:
            return state;
    }
}
