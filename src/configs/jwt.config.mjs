"use strict";
import JwtFilter from "./security/jwt/JwtFilter.mjs";
import getUserService from "../services/UserService.mjs";
import RequestMatcher from "./security/RequestMatcher.js";

const publicUrls = [
    new RequestMatcher('/account/login'),
];


let jwtFilter = null;
export default function getJwtFilter() {
    if (jwtFilter === null)
        jwtFilter = new JwtFilter(publicUrls, getUserService());
    return async (req, res, next) => {
        jwtFilter.filter(req, res, next);
    };
};