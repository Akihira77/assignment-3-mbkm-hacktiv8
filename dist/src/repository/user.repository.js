import User from "../models/user.model.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import Photo from "../models/photo.model.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";
class UserRepository {
    userModel;
    constructor() {
        this.userModel = User;
    }
    async getAllWithFilter(filter) {
        let result = [];
        if (!filter) {
            result = await this.userModel.findAll();
        }
        else {
            result = await this.userModel.findAll({
                where: filter,
            });
        }
        return result;
    }
    async getAllIncludePhoto(filter) {
        let result = [];
        if (!filter) {
            result = await this.userModel.findAll({ include: Photo });
        }
        else {
            result = await this.userModel.findAll({
                where: filter,
                include: Photo,
            });
        }
        return result;
    }
    async getByEmail(email) {
        return await this.userModel.findOne({ where: { email } });
    }
    async getById(id) {
        if (!this.validateUserIdUUID(id)) {
            return null;
        }
        return await this.userModel.findByPk(id);
    }
    async add(user) {
        const id = this.generatePkId();
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        await this.userModel.create({
            id,
            username: user.username,
            email: user.email,
            password: hashedPassword,
        });
    }
    async login(userLogin) {
        const user = await this.userModel.findOne({
            where: { email: userLogin.email },
        });
        if (!user) {
            return null;
        }
        const isMatched = await bcrypt.compare(userLogin.password, user.password);
        if (!isMatched) {
            return null;
        }
        const token = jwt.sign({ username: user.username, email: user.email }, JWT_SECRET);
        const result = {
            userId: user.id,
            username: user.username,
            email: user.email,
            token,
        };
        return result;
    }
    generatePkId() {
        return uuidv4();
    }
    validateUserIdUUID(id) {
        const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
        return regexExp.test(id);
    }
}
export default new UserRepository();
//# sourceMappingURL=user.repository.js.map