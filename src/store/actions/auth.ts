import authConstants from '../constants/auth'

export const setUser = (user: any) => ({
    type: authConstants.SET_USER,
    payload: user,
})

export const setMainBgColor = (color: any) => ({
    type: authConstants.SET_MAIN_BG_COLOR,
    payload: color,
})

export const setActiveRoute = (route: any) => ({
    type: authConstants.SET_ACTIVE_ROUTE,
    payload: route,
})
