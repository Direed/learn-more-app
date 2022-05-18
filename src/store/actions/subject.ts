import subjectConstant from '../constants/subject'

export const setSubject = (subject: any) => ({
    type: subjectConstant.SET_SUBJECT,
    payload: subject,
})
