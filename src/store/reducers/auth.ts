interface AuthState {
    key: number,
}

const initialState: AuthState = {
    key: 0,
}

export const authReducer = (state = initialState, action: any) => {
    const {type, payload} = action
    switch(type) {
        case 'INITIAL_APP':
            return {
                ...state,
                key: payload,
            }
        default:
            return {
                ...state
            }
    }
}
