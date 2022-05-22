import authConstants from '../constants/auth'
export interface IUser {
    uid: string,
    first_name?: string,
    last_name?: string,
    dob?: Date,
    email?: string,
    photo?: string,
}

export interface AuthState {
    key: number,
    mainBgColor: string,
    activeRoute: string,
    user: IUser | null,
}

const initialState: AuthState = {
    key: 0,
    mainBgColor: '',
    activeRoute: '',
    user: null,
}

export const authReducer = (state = initialState, action: any) => {
    const {type, payload} = action
    switch(type) {
        case authConstants.SET_USER:
            return {
                ...state,
                user: payload
            }
        case authConstants.SET_MAIN_BG_COLOR:
            return {
                ...state,
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
