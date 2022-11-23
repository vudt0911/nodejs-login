"use strict";
function createRouters(pathPrefix, app, ...resources) {
    console.log("createRouters: ", resources);
    pathPrefix = `/${pathPrefix}/`;

    const paths = resources.map(resource => resource.getPath());
    resources.forEach(resource => {
        if (paths.filter(path => path === resource.getPath()).length > 1) {
            throw new Error(`Duplicate path ${resource.getPath()} for router ${resource.getName()}`);
        }
    });

    resources.forEach(resource => {
        const router = resource.router;
        const path = pathPrefix.concat(router.getPath())

        router.createRouter(app, path);
        console.log(`Router ${router.getName()} with path ${path} has been created!`);
    });
};
module.exports = {createRouters};