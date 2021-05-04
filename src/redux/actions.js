import * as types from "./types";

function userLogin(userData) {
  return { type: types.USER, payload: userData };
}

function userLogout() {
  return { type: types.DELETE };
}

export { userLogin, userLogout };
