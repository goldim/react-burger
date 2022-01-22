import { AuthReducer as reducer } from "./auth"

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
        {
            currentUser: {
                loaded: false,
                name: "",
                email: "",
                password: ""
            },
            accessToken: "",
            refreshToken: "",
            resetSuccess: false,
            savePasswordSuccess: false,
            logoutSuccess: false
        }
    )
  })
})