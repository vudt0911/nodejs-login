"use strict";

import getJwtProvider from "../../configs/security/jwt/JwtProvider.mjs";
import getUserService from "../../services/UserService.mjs";
import passwordEncoder from "../../configs/security/PasswordEncoder.mjs";
import CustomErrorDto from "../../dtos/CustomErrorDto.mjs";
import UserLoginResponseDto from "../../dtos/UserLoginResponseDto.mjs";
import RoleEntitySchema from "../../entities/RoleEntity.js";

async function myInfo(req, res) {
    const user = {
        "admin": "admin",
        password: "12345",
        email: "admin@admin.com"
    };
    res.send(user);
}

async function login(req, res, next) {
    const userService = await getUserService();
    res.send(await userService.login({
        username: req.body.username,
        password: req.body.password,
    }));
}

const accountHandler = {
    myInfo,
    login,
};
export default accountHandler;