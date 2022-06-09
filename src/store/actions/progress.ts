import progressConstants from "../constants/progress";


export const setSubjectProgress = (subject: any) => ({
    type: progressConstants.SET_SUBJECT,
    payload: subject,
})

export const setTopicProgress = (topic: any) => ({
    type: progressConstants.SET_TOPIC,
    payload: topic,
})
