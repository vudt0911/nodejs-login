export default class CustomErrorDto extends Error {
    constructor(code, data = null) {
        super();
        this.code = code;
        this.data = data;
    }
}