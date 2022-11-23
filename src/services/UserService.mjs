import getJwtProvider from "../configs/security/jwt/JwtProvider.mjs";
import {Op} from "sequelize";
import getUserRepository from "../repositories/UserRepository.mjs";
import passwordEncoder from "../configs/security/PasswordEncoder.mjs";
import CustomErrorDto from "../dtos/CustomErrorDto.mjs";
import UserLoginResponseDto from "../dtos/UserLoginResponseDto.mjs";
import RoleEntitySchema from "../entities/RoleEntity.js";


class UserService {

    #userRepository

    constructor(userRepository) {
        this.#userRepository = userRepository;
    }

    async validateToken(token) {
        return getJwtProvider().verify(token);
    }

    async findByUsernameOrEmail(username) {
        return this.#userRepository
            .findOne({
                    where: {
                        [Op.or]: [
                            {username: username},
                            {email: username}
                        ]
                    }
                }
            );
    }

    async login(userLoginModel) {
        const jwtProvider = await getJwtProvider();
        const user = await this.findByUsernameOrEmail(userLoginModel.username);

        if (!user || !(await passwordEncoder.compare(userLoginModel.password.toString(), user.password)))
            // next(new CustomErrorDto(9));
            throw  new CustomErrorDto(9);
        else {
            const response = new UserLoginResponseDto(
                await jwtProvider.sign(user.username),
                'Bearer',
                1800,
                (await user[RoleEntitySchema.pluralGet]()).map(role => role.roleName)
            )
            return response
        }
    }
}

let userService;

export default async function getUserService() {
    if (!userService)
        userService = new UserService(await getUserRepository());
    return userService;
};