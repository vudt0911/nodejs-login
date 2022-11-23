"use strict";

class UserEntity {
    constructor(id, username, password, email) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
    }
};

const UserEntitySchema = {
    entity: UserEntity,
    singular: "user",
    plural: "users",
    singularAdd: "getUser",
    singularGet: "getUsers",
    pluralAdd: "addUsers",
    pluralGet: "getUsers",
}

export default UserEntitySchema;