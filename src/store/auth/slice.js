import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { push } from 'connected-react-router';

const sliceName = 'auth';

const registerUser = createAsyncThunk(
  `${sliceName}/registerUser`,
  async (registerData, { dispatch, extra: { authApi } }) => {
    const data = await authApi.signup(registerData);
    dispatch(push('/signin'));
    return data;
  }
);

const loginUser = createAsyncThunk(
  `${sliceName}/loginUser`,
  async (loginData, {dispatch, extra: {authApi}} )=>{
    const data = await authApi.signin(loginData);
    dispatch(push('/'));
    return data;
  }
)

const checkAuth = createAsyncThunk(
  `${sliceName}/checkAuth`,
  async (_, { extra: { authApi } }) => {
    return await authApi.checkIsAuthorized();
  }
);

const logOut = createAsyncThunk(
  `${sliceName}/logOut`,
  async (_, { extra: { authApi } }) => {
    return await authApi.signout();
  }
)

const authSlice = createSlice({
  name: sliceName,
  initialState: {
    data: '',
    authChecking: true,

    registerSending: false,
    registerError: '',

    loginSending: false,
    loginError: '',

    logOutInProgress: false,



  },
  reducers: {
    setUserData(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: {
    [checkAuth.pending]: (state) => {
      state.authChecking = true
    },
    [checkAuth.fulfilled]: (state, action) => {
      state.authChecking = false;
      state.data = {
        id: action.payload.data._id,
        email: action.payload.data.email
      };
    },
    [checkAuth.rejected]: (state) => {
      state.authChecking = false
    },

    [registerUser.pending]: (state) =>{
      state.registerSending = true;
    },
    [registerUser.fulfilled]: (state)=>{
      state.registerSending = false;
      state.registerError = '';
    },
    [registerUser.rejected]: (state, action)=>{
      state.registerSending = false;
      state.registerError = action.error.message;
    },

    [loginUser.pending]: (state) =>{
      state.loginSending = true;
    },
    [loginUser.fulfilled]: (state)=>{
      state.loginSending = false;
      state.loginError = '';
    },
    [loginUser.rejected]: (state, action)=>{
      state.loginSending = false;
      state.loginError = action.error.message;
    },

    [logOut.pending]: (state) =>{
      state.logOutInProgress = true;
    },
    [logOut.fulfilled]: (state)=>{
      state.logOutInProgress = false;
      state.data = '';
      state.logOutError = '';
    },
    [logOut.rejected]: (state, action)=>{
      state.logOutInProgress = false;
      state.logOutError = action.error.message;
    }
  }
});

const { reducer } = authSlice;

export default reducer;

export {

  sliceName,

  registerUser,
  loginUser,
  checkAuth,
  logOut

}
