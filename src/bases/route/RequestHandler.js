"use strict";
import {forceFormatUrlPath} from "../../utils/Utils.js";
import AccessDeniedError from "../../configs/security/errors/AccessDeniedError.mjs";

export default class RequestHandler {
    #path
    #handler
    #allowedRoles

    constructor(path, handler, allowedRoles = []) {
        if (path === null || path === undefined)
            throw new Error(`Path is require for resource handler. ${path}`);
        this.#path = forceFormatUrlPath(path);
        if (typeof (handler) !== "function")
            throw new Error(`Handler must be function for resource handler.`);
        this.#handler = handler;
        this.#allowedRoles = allowedRoles;
    }

    getPath() {
        return this.#path;
    }

    getHandler() {
        const security = this.getSecurity();
        return security ? [security, this.wrapError(this.#handler)] : this.wrapError(this.#handler);
        // return security ? [security, this.#handler] : this.#handler;
    }

    wrapError(handler) {
        return async (req, res, next) => {
            try {
                await handler(req, res, next);
            } catch (err) {
                next(err);
            }
        };
    }

    getSecurity() {
        if (this.#allowedRoles.length === 0)
            return null;
        return (req, res, next) => {
            if (!req.$auth)
                throw new AccessDeniedError(`Access denied for ${req.url}`);
            let hasPermitted = false;
            for (let role of this.#allowedRoles) {
                if (req.$auth.getAuthorities().includes(role)) {
                    hasPermitted = true
                    break;
                }
            }
            if (!hasPermitted)
                throw new AccessDeniedError(`Access denied for ${req.url}`);
            else next();
        }
    }
};


