"use strict";
import {forceFormatUrlPath} from "../../utils/Utils.js";

class ResourceHandler {
    #basePath
    #getMappings = new Map()
    #postMappings = new Map()
    #putMappings = new Map()
    #patchMappings = new Map()
    #deleteMappings = new Map()
    #headMappings = new Map()
    #optionsMappings = new Map()

    constructor(basePath) {
        if (!basePath)
            throw new Error("Base path is required for create resource");
        this.#basePath = forceFormatUrlPath(basePath);
    }

    getBasePath() {
        return this.#basePath;
    }


    get(handler) {
        if (this.#getMappings.has(handler.getPath()))
            throw new Error(`${this.#basePath} has multiple get mapping with '${handler.getPath()}'`);
        this.#getMappings.set(handler.getPath(), handler);
        return this;
    }

    post(handler) {
        if (this.#getMappings.has(handler.getPath()))
            throw new Error(`${this.#basePath} has multiple post mapping with '${handler.getPath()}'`);
        this.#postMappings.set(handler.getPath(), handler);
        return this;
    }

    put(handler) {
        if (this.#putMappings.has(handler.getPath()))
            throw new Error(`${this.#basePath} has multiple put mapping with '${handler.getPath()}'`);
        this.#getMappings.set(handler.getPath(), handler);
        return this;
    }

    patch(handler) {
        if (this.#patchMappings.has(handler.getPath()))
            throw new Error(`${this.#basePath} has multiple patch mapping with '${handler.getPath()}'`);
        this.#patchMappings.set(handler.getPath(), handler);
        return this;
    }

    delete(handler) {
        if (this.#deleteMappings.has(handler.getPath()))
            throw new Error(`${this.#basePath} has multiple delete mapping with '${handler.getPath()}'`);
        this.#deleteMappings.set(handler.getPath(), handler);
        return this;
    }

    options(handler) {
        if (this.#optionsMappings.has(handler.getPath()))
            throw new Error(`${this.#basePath} has multiple options mapping with '${handler.getPath()}'`);
        this.#optionsMappings.set(handler.getPath(), handler);
        return this;
    }

    head(handler) {
        if (this.#headMappings.has(handler.getPath()))
            throw new Error(`${this.#basePath} has multiple head mapping with '${handler.getPath()}'`);
        this.#headMappings.set(handler.getPath(), handler);
        return this;
    }

    createRoute(router) {
        this.#getMappings.forEach((v, k) => {
            console.log(`Creating get path ${k}`);
            router.get(k, v.getHandler());
        });

        this.#postMappings.forEach((v, k) => {
            console.log(`Creating post path ${k}`);
            router.post(k, v.getHandler());
        });
        this.#putMappings.forEach((v, k) => {
            console.log(`Creating put path ${k}`);
            router.put(k, v.getHandler());
        });
        this.#patchMappings.forEach((v, k) => {
            console.log(`Creating patch path ${k}`);
            router.patch(k, v.getHandler());
        });
        this.#deleteMappings.forEach((v, k) => {
            console.log(`Creating delete path ${k}`);
            router.delete(k, v.getHandler());
        });
        this.#optionsMappings.forEach((v, k) => {
            console.log(`Creating options path ${k}`);
            router.options(k, v.getHandler());
        });
        this.#headMappings.forEach((v, k) => {
            console.log(`Creating head path ${k}`);
            router.head(k, v.getHandler());
        });
        return router;
    }
};

const securityFilter = v => {

}

export default ResourceHandler;





