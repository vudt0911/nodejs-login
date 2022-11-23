"use strict";

import bcrypt from 'bcryptjs';

class PasswordEncoder {
    static async encodePassword(password) {
        return bcrypt.hashSync(password, 10);
    }

    static async comparePassword(password, hash) {
        return bcrypt.compareSync(password, hash);
    }
}

const passwordEncoder = {
    encode: PasswordEncoder.encodePassword,
    compare: PasswordEncoder.comparePassword,
};

export default passwordEncoder;