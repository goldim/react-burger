import { loadProfileFailed, loginGenerator, logoutGenerator, registerGenerator, resetPasswordGenerator, savePasswordGenerator, updateProfileGenerator } from "../actions/auth"
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

  it('should handle LOGIN', () => {
    const action = loginGenerator({user: {name: 'root', email: 'root@test.org'}});
    expect(reducer(undefined, action)).toEqual(
      {
        currentUser: {
            loaded: false,
            name: "root",
            email: "root@test.org",
            password: ""
        },
        accessToken: undefined,
        refreshToken: undefined,
        resetSuccess: false,
        savePasswordSuccess: false,
        logoutSuccess: false
      }
    )
  })

  it('should handle LOGOUT', () => {
    const action = logoutGenerator();
    expect(reducer(undefined, action)).toEqual(
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
        logoutSuccess: true
      }
    )
  })

  it('should handle RESET_PASSWORD', () => {
    const action = resetPasswordGenerator("root@test.org");
    expect(reducer(undefined, action)).toEqual(
      {
        currentUser: {
            loaded: false,
            name: "",
            email: "",
            password: ""
        },
        accessToken: "",
        refreshToken: "",
        resetSuccess: true,
        savePasswordSuccess: false,
        logoutSuccess: false
      }
    )
  })

  it('should handle LOAD_PROFILE_FAILED', () => {
    const action = loadProfileFailed();
    expect(reducer(undefined, action)).toEqual(
      {
        currentUser: {
            loaded: true,
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

  it('should handle UPDATE_PROFILE', () => {
    const action = updateProfileGenerator({name: 'root', email: 'root@test.org'});
    expect(reducer(undefined, action)).toEqual(
      {
        currentUser: {
            loaded: true,
            name: "root",
            email: "root@test.org",
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

  it('should handle SAVE_PASSWORD', () => {
    const action = savePasswordGenerator();
    expect(reducer(undefined, action)).toEqual(
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
        savePasswordSuccess: true,
        logoutSuccess: false
      }
    )
  })

  it('should handle REGISTER', () => {
    const action = registerGenerator({
      name: 'root',
      email: 'root@test.org',
      accessToken: 'test1',
      refreshToken: 'test2'
    });
    expect(reducer(undefined, action)).toEqual(
      {
        currentUser: {
            loaded: false,
            name: "root",
            email: "root@test.org",
            password: ""
        },
        accessToken: "test1",
        refreshToken: "test2",
        resetSuccess: false,
        savePasswordSuccess: false,
        logoutSuccess: false
      }
    )
  })
})