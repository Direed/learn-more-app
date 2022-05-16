import authConstants from '../constants/auth'
export interface AuthState {
    key: number,
    mainBgColor: string,
    activeRoute: string,
}

const initialState: AuthState = {
    key: 0,
    mainBgColor: '',
    activeRoute: '',
}

export const authReducer = (state = initialState, action: any) => {
    const {type, payload} = action
    switch(type) {
        case authConstants.SET_USER:
            return {
                ...state,

            }
        case authConstants.SET_MAIN_BG_COLOR:
            return {
                mainBgColor: payload,
            }
        case authConstants.SET_ACTIVE_ROUTE:
            return {
                ...state,
                activeRoute: payload,
            }
        default:
            return state;
    }
}
