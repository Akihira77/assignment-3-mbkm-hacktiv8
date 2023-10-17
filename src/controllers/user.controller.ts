import { Request, Response } from "express";
import userRepository from "../repository/user.repository.js";
import { StatusCodes } from "../utils/constant.js";
import { CreateUserDTO, LoginDTO } from "../dto/user.dto.js";
import BadRequestError from "../errors/bad-request.error.js";

const getAll = async (
    req: Request<never, never, never, { includePhoto: boolean }>,
    res: Response
): Promise<void> => {
    try {
        let users;

        if (req.query.includePhoto) {
            users = await userRepository.getAllIncludePhoto();
        } else {
            users = await userRepository.getAllWithFilter();
        }

        res.status(StatusCodes.Ok200).send({ users });
        return;
    } catch (error) {
        throw error;
    }
};

const register = async (
    req: Request<never, never, CreateUserDTO, never>,
    res: Response
): Promise<void> => {
    try {
        const user = req.body;

        if (!(user.email || user.password || user.username)) {
            throw new BadRequestError(
                "Email, Password, and Username cannot be null. Please try again!"
            );
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
    } catch (error) {
        throw error;
    }
};

const getAllUserIncludePhoto = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const users = await userRepository.getAllIncludePhoto();

        res.status(StatusCodes.Ok200).send(users);
        return;
    } catch (error) {
        throw error;
    }
};

const login = async (
    req: Request<never, never, LoginDTO, never>,
    res: Response
): Promise<void> => {
    try {
        const userLogin = req.body;
        const result = await userRepository.login(userLogin);

        if (!result) {
            throw new BadRequestError(
                "Username or Password is not correct. Please try again!"
            );
        }

        res.status(StatusCodes.Ok200).send({ user: result });
        return;
    } catch (error) {
        throw error;
    }
};

export { getAll, register, getAllUserIncludePhoto, login };
