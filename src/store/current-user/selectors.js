import { sliceName } from "./slice";

const getUserData = (store) => store[sliceName].userData;

const getIsTextInfoSending = (store) => store[sliceName].textInfoSending;
const getTextInfoError = (store) => store[sliceName].textInfoSendingError;

const getIsAvatarSending = (store) => store[sliceName].avatarSending;
const getAvatarError = (store) => store[sliceName].avatarSendingError;

export {
  getUserData,

  getIsTextInfoSending,
  getTextInfoError,

  getIsAvatarSending,
  getAvatarError,
}
