import progressConstants from "../constants/progress";

export interface ProgressState {
    subject: any;
    topic: any;
}

const initialState: ProgressState = {
    subject: null,
    topic: null,
}

export const progressReducer = (state = initialState, action: any) => {
    const {type, payload} = action
    switch(type) {
        case progressConstants.SET_SUBJECT:
            return {
                ...state,
                subject: payload
            }
        case progressConstants.SET_TOPIC:
            return {
                ...state,
                topic: payload
            }

        default:
            return state;
    }
}
