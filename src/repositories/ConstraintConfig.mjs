import RoleEntitySchema from "../entities/RoleEntity.js";
import UserEntitySchema from "../entities/UserEntity.js";
import getUserRepository from "./UserRepository.mjs";
import getRoleRepository from "./RoleRepository.mjs";

const userRepository = await getUserRepository();
const roleRepository = await getRoleRepository();

console.log("test->>> " + userRepository)
console.log("test->>> " + roleRepository)

userRepository.belongsToMany(roleRepository, {
    through: 'tbl_user_role',
    foreignKey: 'user_id',
    otherKey: 'role_id',
    createdAt: false,
    updatedAt: false,
    as: RoleEntitySchema.plural
});

roleRepository.belongsToMany(userRepository, {
    through: 'tbl_user_role',
    foreignKey: 'role_id',
    otherKey: 'user_id',
    createdAt: false,
    updatedAt: false,
    as: UserEntitySchema.plural
});