import api from "../../app/api";

const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
  name: "user",
  initialState: {
    signingUp: false,
    loggingIn: false,
    signupError: null,
    loginError: null,
    loggedIn: false,
  },
  reducers: {
    signupUserStart(state, action) {
      state.signingUp = true;
    },
    signupUserSuccess(state, action) {
      state.signingUp = false;
      state.loggedIn = true;
      state.signupError = null;
    },
    signupUserError(state, action) {
      state.signingUp = false;
      state.loggedIn = false;
      state.signupError = action.payload;
    },
    loginUserStart(state, action) {
      state.loggingIn = true;
    },
    loginUserSuccess(state, action) {
      state.loggingIn = false;
      state.loggedIn = true;
      state.loginError = null;
    },
    loginUserError(state, action) {
      state.loggingIn = false;
      state.loggedIn = false;
      state.loginError = action.payload;
    },
    logout(state, action) {
      state.loggedIn = false;
    },
  },
});

export const {
  signupUserError,
  signupUserStart,
  signupUserSuccess,
  loginUserStart,
  loginUserSuccess,
  loginUserError,
  logout,
} = userSlice.actions;

export const signupUser = (user, history) => {
  return async function (dispatch) {
    dispatch(signupUserStart());

    try {
      const response = await api.post("/users", user);

      dispatch(signupUserSuccess());

      // guardar en localStorage
      localStorage.setItem("token", response.data.token);

      // actulizar instancia de axios
      api.defaults.headers["Authorization"] = `Bearer ${response.data.token}`;

      // redireccionar a tweets
      history.push("/tweets");
    } catch (error) {
      dispatch(signupUserError(error.message));
    }
  };
};

export const loginUser = (user, history) => {
  return async function (dispatch) {
    dispatch(loginUserStart());

    try {
      const response = await api.post("/sessions", user);

      dispatch(loginUserSuccess());

      // guardar en localStorage
      localStorage.setItem("token", response.data.token);

      // actulizar instancia de axios
      api.defaults.headers["Authorization"] = `Bearer ${response.data.token}`;

      // redireccionar a tweets
      history.push("/tweets");
    } catch (error) {
      dispatch(loginUserError(error.message));
    }
  };
};

export default userSlice.reducer;
