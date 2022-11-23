export default class UserLoginResponseDto {
    constructor(token, type, timeValid, roles) {
        this.token = token;
        this.type = type;
        this.timeValid = timeValid;
        this.roles = roles;
    }
}