import authConstants from '../constants/auth'

export const setUser = (user: any) => ({
    type: authConstants.SET_USER,
    payload: user,
})
