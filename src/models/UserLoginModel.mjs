"use strict";
// Path: src\repositories\UserRepository.mjs
export default class UserLoginModel {
  #userName;
  #password;
  #rememberMe;

  getUserName() {
    return this.#userName;
  }

  getPassword() {
    return this.#password;
  }

  getRememberMe() {
    return this.#rememberMe;
  }
}
