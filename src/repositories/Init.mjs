import getRoleRepository from "./RoleRepository.mjs";
import getUserRepository from "./UserRepository.mjs";
import passwordEncoder from "../configs/security/PasswordEncoder.mjs";
import RoleEntitySchema from "../entities/RoleEntity.js";

export async function initRole() {
    const roleRepository = await getRoleRepository();
    try {
        if (!(await roleRepository.findByPk(1)))
            await roleRepository.create({
                id: 1,
                roleName: 'ROLE_ADMIN'
            });
        if (!(await roleRepository.findByPk(2)))
            await roleRepository.create({
                id: 2,
                roleName: 'ROLE_USER'
            });
    } catch (err) {
        console.log("Creating default roles failed: " + err);
    }
};

export async function initUser() {
    const userRepository = await getUserRepository();
    const roleRepository = await getRoleRepository();
    try {
        const adminRole = await roleRepository.findByPk(1);
        let adminUser = await userRepository.findByPk(1);
        if (!adminUser)
            adminUser = await userRepository.create({
                id: 1,
                username: 'admin',
                email: 'admin@email.com',
                password: await passwordEncoder.encode('1234'),
            });

        adminUser[RoleEntitySchema.singularAdd](adminRole);
        adminUser.save();

    } catch (err) {
        console.log("Creating default users failed: " + err);
    }
};