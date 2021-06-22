import { sliceName } from "./slice";

const getIsAuthorized = (store) => !!store[sliceName].data;
const getAuthData = (store) => store[sliceName].data;

const getIsAuthChecking = (store) => store[sliceName].authChecking;
const getRegisterSending = (store) => store[sliceName].registerSending;
const getLoginSending = (store) => store[sliceName].loginSending;

export {
  getIsAuthorized,
  getAuthData,
  getRegisterSending,
  getLoginSending,
  getIsAuthChecking,

}
