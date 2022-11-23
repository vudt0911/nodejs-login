"use strict";
export default class JwtPayloadMustStringError extends Error {
    constructor(message) {
        super(message);
    }
}