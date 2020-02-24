// Action Definition

export interface Login {
  type: 'LOGIN'
  accessToken: string
}
export interface Logout {
  type: 'LOGOUT'
  accessToken: string
}
// Union Action Types
export type Action = Login | Logout


// Action Creators
export const login = (token: string): Login => {
  return { type: 'LOGIN', accessToken:token }
}

export const logout = (): Logout => {
  return { type: 'LOGOUT', accessToken: "" }
}