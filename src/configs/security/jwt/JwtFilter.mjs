"use strict";
import RequestMatcher from "../RequestMatcher.js";
import JwtFilterError from "../errors/JwtFilterError.mjs";
import UserDetail from "./UserDetail.mjs";

export default class JwtFilter {
    #PUBLIC_URL_MATCHERS
    #userService

    constructor(publicUrlMatchers, userService) {
        if (!(publicUrlMatchers instanceof Array))
            throw new JwtFilterError('Public urls must be an array');

        publicUrlMatchers.forEach(matcher => {
            if (!matcher instanceof RequestMatcher)
                throw new JwtFilterError('Url matcher must be an instance of RequestMatcher');
        });

        this.#PUBLIC_URL_MATCHERS = publicUrlMatchers;
        this.#userService = userService;
    }

    async filter(req, res, next) {
        // check if the request is public or private
        let isPublicUrl = false;
        for (let i = 0; i < this.#PUBLIC_URL_MATCHERS.length; i++) {
            if (this.#PUBLIC_URL_MATCHERS[i].match(req)) {
                isPublicUrl = true;
                break;
            }
        }
        console.log('jwt filtering request: ', isPublicUrl, req.url);

        if (isPublicUrl)
            next();
        else {
            const token = req.get("Authorization");
            if (!token) {
                res.status(401).send({
                    message: 'Unauthorized',
                    status: 401,
                });
                return;
            }
            const userDetail = await this.#userService.validateToken(token.slice(7));
            if (!(userDetail instanceof UserDetail))
                next(new JwtFilterError('User detail must be an instance of UserDetail'));
            else if (!(userDetail.getUserAuth()))
                next(new JwtFilterError('UserAuth must be set in UserDetail'));
            req.$auth = userDetail;
            next();
        }
    }
};


