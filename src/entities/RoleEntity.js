"use strict";

class RoleEntity {
    constructor(id, roleName) {
        this.id = id;
        this.roleName = roleName;
    }
};

const RoleEntitySchema = {
    entity: RoleEntity,
    singular: "role",
    plural: "roles",
    singularAdd: "addRole",
    singularGet: "getRole",
    pluralAdd: "addRoles",
    pluralGet: "getRoles",
}

export default RoleEntitySchema;