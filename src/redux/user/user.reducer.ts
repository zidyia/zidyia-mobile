import { Action } from './user.types'
// States' definition
export interface AccessToken {
    accessToken?: string
}

export interface State {
    accessToken: AccessToken
}

export const accessToken: any = (state: State = { accessToken }, action: Action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, accessToken }
        case 'LOGOUT':
            return {...state,accessToken: null}
        default:
            return {...state}
    }
}


