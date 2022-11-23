export default class JwtFilterError extends Error {
    constructor(message) {
        super(message);
        this.name = 'JwtFilterError';
    }
}