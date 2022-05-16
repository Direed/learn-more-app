import topicConstant from '../constants/topic'

export const setTopic = (topic: any) => ({
    type: topicConstant.SET_TOPIC,
    payload: topic,
})
