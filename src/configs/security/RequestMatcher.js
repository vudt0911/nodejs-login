"use strict";
import {forceFormatUrlPath} from "../../utils/Utils.js";

export default class RequestMatcher {
    static #HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'];
    static #MATCH_ALL = '/**';
    static #CUSTOM = '##';
    #isRegex = false;
    #path
    #httpMethod
    #basePath
    #pattern

    constructor(path, httpMethod = undefined) {
        if (typeof path !== 'string')
            throw new RequestMatcherPathError('Path must be a string');
        path = forceFormatUrlPath(path);

        if (RequestMatcher.#HTTP_METHODS.includes(httpMethod))
            this.#httpMethod = httpMethod;

        if (path.endsWith(RequestMatcher.#MATCH_ALL)) {
            this.#isRegex = true;
            this.#basePath = path.slice(0, path.indexOf(RequestMatcher.#MATCH_ALL));
            this.#pattern = path.slice(path.indexOf(RequestMatcher.#MATCH_ALL));
        } else if (path.endsWith(RequestMatcher.#CUSTOM)) {
            this.#isRegex = true;
            this.#basePath = path.slice(0, path.indexOf(RequestMatcher.#CUSTOM));
            this.#pattern = new RegExp(path.slice(path.indexOf(RequestMatcher.#CUSTOM) + 3, path.lastIndexOf(RequestMatcher.#CUSTOM)), 'g');
        }
        this.#path = path;
    }

    match(req) {
        if (this.#httpMethod) {
            if (req.method !== this.#httpMethod)
                return false;
        }
        if (!this.#isRegex)
            return this.#path === req.url; //  check if this is correct path
        else {
            let path = req.url;
            if (path.startsWith(this.#basePath)) {
                if (this.#path.endsWith(RequestMatcher.#MATCH_ALL)) // match all
                    return true;
                path = path.slice(this.#basePath.length + 1); // remove base path
                return path.match(this.#pattern); // match custom pattern
            } else return false;
        }
    }
}


class RequestMatcherPathError extends Error {
    constructor(message) {
        super(message);
        this.name = 'RequestMatcherError';
    }
}