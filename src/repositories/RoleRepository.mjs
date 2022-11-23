"use strict";
// Path: src\repositories\UserRepository.mjs
import {DataTypes, Model} from "sequelize";
import getEntityManager from "../configs/db.config.mjs";


class RoleRepository extends Model {
}

async function createRoleRepository() {
    return RoleRepository.init({
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            field: 'id'
        },
        roleName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            field: 'role_name'
        },

    }, {
        // Other model options go here
        sequelize: await getEntityManager(), // We need to pass the connection instance
        tableName: 'tbl_role', // We need to choose the model name,
        modelName: 'role'
    });
}

let roleRepository = null;
export default async function getRoleRepository() {
    if (!roleRepository)
        roleRepository = await createRoleRepository();
    return roleRepository;
}

