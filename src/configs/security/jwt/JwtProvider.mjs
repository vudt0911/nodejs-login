"use strict";
import jwt from "jsonwebtoken";
import JwtPayloadMustStringError from "../errors/JwtPayloadMustStringError.mjs";

class JwtProvider {
    #secret

    constructor() {
        this.#secret = process.env.JWT_SECRET;
    }

    async sign(payload, timeValid = 1800) {
        if (typeof payload !== 'string')
            throw new JwtPayloadMustStringError('payload must be string');
        return jwt.sign({
            data: payload
        }, this.#secret, {expiresIn: timeValid});
    }

    async verify(token) {
        return jwt.verify(token, this.#secret);
    }

};

let defaultJwtProvider = null;

export default function getJwtProvider() {
    if (defaultJwtProvider === null)
        defaultJwtProvider = new JwtProvider();
    return defaultJwtProvider;
}
