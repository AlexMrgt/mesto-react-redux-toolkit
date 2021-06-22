import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const sliceName = 'user';

const loadCurrentUser = createAsyncThunk(
  `${sliceName}/loadCurrentUser`,
  async (_, { extra: { mestoApi } }) => {
    return await mestoApi.getUserData();
  }
)

const sendUserTextInfo = createAsyncThunk(
  `${sliceName}/sendUserInfo`,
  async (newUserData, { extra: { mestoApi } }) => {
    return await mestoApi.updateTextInfo(newUserData);
  }
)

const sendAvatar = createAsyncThunk(
  `${sliceName}/sendAvatar`,
  async (newUserData, { extra: { mestoApi } }) => {
    return await mestoApi.updateAvatar(newUserData);
  }
)

const initialState = {
  userData: {},
  loadingUserData: false,

  textInfoSending: false,
  textInfoSendingError: '',

  avatarSending: false,
  avatarSendingError: '',
}

const userSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {

  },
  extraReducers: {
    [loadCurrentUser.pending]: (state) => {
      state.loadingUserData = true
    },
    [loadCurrentUser.fulfilled]: (state, action) => {
      state.loadingUserData = false;
      state.userData = action.payload.data;
    },
    [loadCurrentUser.rejected]: (state) => {
      state.loadingUserData = false
    },

    [sendUserTextInfo.pending]: (state) => {
      state.textInfoSending = true;
      state.textInfoSendingError = '';
    },
    [sendUserTextInfo.fulfilled]: (state, action) => {
      state.textInfoSending = false;
      state.userData = action.payload.data;
    },
    [sendUserTextInfo.rejected]: (state, action) => {
      state.textInfoSending = false
      state.textInfoSendingError = action.error;
    },

    [sendAvatar.pending]: (state) => {
      state.avatarSending = true;
      state.avatarSendingError = '';
    },
    [sendAvatar.fulfilled]: (state, action) => {
      state.avatarSending = false;
      state.userData = action.payload.data;
    },
    [sendAvatar.rejected]: (state, action) => {
      state.avatarSending = false
      state.avatarSendingError = action.error;
    },
  }
});

const { reducer } = userSlice;

export default reducer;

export {
  sliceName,

  loadCurrentUser,
  sendUserTextInfo,
  sendAvatar,

}
