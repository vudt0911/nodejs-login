"use strict";
// Path: src\models\UserModel.mjs

export default class UserModel {
    static async toEntity(model) {
        const entity = {};
        entity.id = model.id;
        entity.username = model.username;
        entity.password = model.password;
        entity.email = model.email;
        entity.role = model.role;
        return entity;
    }
}