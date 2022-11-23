"use strict";
import express from "express";

function initResources(app, ...resources) {
    const checkRoute = resources.map(resource => resource.getBasePath());

    resources.forEach(resource => {
        if (checkRoute.filter(path => path === resource.getBasePath()).length > 1)
            throw new Error(`Failed to create route because path '${resource.getBasePath()}' has multiple`);
    });

    resources.forEach(resource => {
        console.log(`Creating mapping for group path '${resource.getBasePath()}'`)
        app.use(resource.getBasePath(), resource.createRoute(express.Router()))
    });
    console.log('Completed create route');
};
export default initResources;
