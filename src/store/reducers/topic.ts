import topicConstants from '../constants/topic'
export interface TopicState {
    key: number,
    topic: any,
}

const initialState: TopicState = {
    key: 0,
    topic: null,
}

export const topicReducer = (state = initialState, action: any) => {
    const {type, payload} = action
    switch(type) {
        case topicConstants.SET_TOPIC:
            return {
                ...state,
                topic: payload,
            }
        default:
            return state;
    }
}
