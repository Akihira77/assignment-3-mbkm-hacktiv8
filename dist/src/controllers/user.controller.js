import userRepository from "../repository/user.repository.js";
import { StatusCodes } from "../utils/constant.js";
import BadRequestError from "../errors/bad-request.error.js";
const getAll = async (req, res) => {
    try {
        let users;
        if (req.query.includePhoto) {
            users = await userRepository.getAllIncludePhoto();
        }
        else {
            users = await userRepository.getAllWithFilter();
        }
        res.status(StatusCodes.Ok200).send({ users });
        return;
    }
    catch (error) {
        throw error;
    }
};
const register = async (req, res) => {
    try {
        const user = req.body;
        if (!(user.email || user.password || user.username)) {
            throw new BadRequestError("Email, Password, and Username cannot be null. Please try again!");
        }
        const existedUser = await userRepository.getByEmail(user.email);
        if (existedUser) {
            throw new BadRequestError("Email already registered");
        }
        await userRepository.add(user);
        res.status(StatusCodes.Created201).send({
            msg: "User created successfully",
        });
        return;
    }
    catch (error) {
        throw error;
    }
};
const getAllUserIncludePhoto = async (req, res) => {
    try {
        const users = await userRepository.getAllIncludePhoto();
        res.status(StatusCodes.Ok200).send(users);
        return;
    }
    catch (error) {
        throw error;
    }
};
const login = async (req, res) => {
    try {
        const userLogin = req.body;
        const result = await userRepository.login(userLogin);
        if (!result) {
            throw new BadRequestError("Username or Password is not correct. Please try again!");
        }
        res.status(StatusCodes.Ok200).send({ user: result });
        return;
    }
    catch (error) {
        throw error;
    }
};
export { getAll, register, getAllUserIncludePhoto, login };
//# sourceMappingURL=user.controller.js.map