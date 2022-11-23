"use strict";
// Path: src\repositories\UserRepository.mjs
import {DataTypes, Model} from "sequelize";
import getEntityManager from "../configs/db.config.mjs";

class UserRepository extends Model {
}

async function createUserRepository() {
    return UserRepository.init({
        id: {
            type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true, field: 'id'
        }, username: {
            type: DataTypes.STRING, allowNull: false, unique: true, field: 'user_name'
        }, email: {
            type: DataTypes.STRING, allowNull: false, unique: true, field: 'email'
        }, password: {
            type: DataTypes.STRING, allowNull: false, field: 'password'
        },

    }, {
        // Other model options go here
        sequelize: await getEntityManager(), // We need to pass the connection instance
        tableName: 'tbl_user', // We need to choose the model name
        modelName: 'user'
    });
}

let userRepository = null;
export default async function getUserRepository() {
    if (!userRepository) userRepository = await createUserRepository();
    return userRepository;
}

