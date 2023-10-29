import photoRepository from "../repository/photo.repository.js";
import { StatusCodes } from "../utils/constant.js";
import NotFoundError from "../errors/not-found.error.js";
import userRepository from "../repository/user.repository.js";
import BadRequestError from "../errors/bad-request.error.js";
const getAllPhoto = async (req, res) => {
    try {
        const { include, title, caption } = req.query;
        let photos = [];
        let filter;
        if (title && title !== "") {
            filter = { ...filter, title };
        }
        if (caption && caption !== "") {
            filter = { ...filter, caption };
        }
        photos = await photoRepository.getAllWithFilter(filter, include);
        res.status(StatusCodes.Ok200).send({ photos });
        return;
    }
    catch (error) {
        throw error;
    }
};
const getPhotoById = async (req, res) => {
    try {
        const { id } = req.params;
        const photo = await photoRepository.getById(id, req.query.include);
        if (!photo) {
            throw new NotFoundError("Photo does not found");
        }
        res.status(StatusCodes.Ok200).send({ photo });
        return;
    }
    catch (error) {
        throw error;
    }
};
const createPhoto = async (req, res) => {
    try {
        const photoDto = req.body;
        const existingUser = await userRepository.getById(photoDto.userId);
        if (!existingUser) {
            throw new BadRequestError("Photo must be tied by User, however User your provided does not exist");
        }
        const photo = await photoRepository.add(photoDto);
        res.status(StatusCodes.Created201).send({
            msg: "Photo succesfuly added",
            photo,
        });
        return;
    }
    catch (error) {
        throw error;
    }
};
export { getAllPhoto, getPhotoById, createPhoto };
//# sourceMappingURL=photo.controller.js.map