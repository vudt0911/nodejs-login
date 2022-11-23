"use strict";
export default class UserDetail {
    #userAuth

    setUserAuth(user) {
        this.#userAuth = user;
    }

    getUserAuth() {
        return this.#userAuth;
    }

    getAuthorities() {
        throw new Error("UserDetail has not implemented func 'getAuthorities'");
    };
};
