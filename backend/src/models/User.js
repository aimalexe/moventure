import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from 'config';

import { toJSON } from './plugins/to-json.js';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 50,
        trim: true,
        required: true,
    },

    email: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255,
        trim: true,
        unique: true,
    },

    password: {
        type: String,
        minLength: 8,
        maxLength: 255,
        required: true,
        trim: true,
        private: true,
    },
}, { timestamps: true },
);

userSchema.plugin(toJSON);

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, config.get('JWT_PRIVATE_KEY'));
};

userSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    console.log(this.password);
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log(this.password);
    next();
});

const User = new mongoose.model('user', userSchema);
export { User };
