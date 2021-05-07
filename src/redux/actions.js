import * as types from "./types";

function userLogin(userData) {
  return { type: types.USER, payload: userData };
}

function userLogout() {
  return { type: types.DELETE };
}

function update(updatedData){
  return { type:types.UPDATE , payload:updatedData }
}

export { userLogin, userLogout, update };
