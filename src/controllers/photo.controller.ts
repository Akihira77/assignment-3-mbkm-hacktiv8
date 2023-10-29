import { Request, Response } from "express";
import photoRepository from "../repository/photo.repository.js";
import { StatusCodes } from "../utils/constant.js";
import NotFoundError from "../errors/not-found.error.js";
import { CreatePhotoDto } from "../dto/photo.dto.js";
import userRepository from "../repository/user.repository.js";
import BadRequestError from "../errors/bad-request.error.js";
import Photo from "../models/photo.model.js";

const getAllPhoto = async (
	req: Request<
		never,
		never,
		never,
		{ title?: string; caption?: string; include?: string }
	>,
	res: Response
): Promise<void> => {
	try {
		const { include, title, caption } = req.query;
		let photos: Photo[] = [];
		let filter: Record<string, string | number | boolean> | undefined;

		if (title && title !== "") {
			filter = { ...filter, title };
		}

		if (caption && caption !== "") {
			filter = { ...filter, caption };
		}
		photos = await photoRepository.getAllWithFilter(filter, include);

		res.status(StatusCodes.Ok200).send({ photos });
		return;
	} catch (error) {
		throw error;
	}
};

const getPhotoById = async (
	req: Request<{ id: string }, never, never, { include?: string }>,
	res: Response
): Promise<void> => {
	try {
		const { id } = req.params;

		const photo = await photoRepository.getById(id, req.query.include);

		if (!photo) {
			throw new NotFoundError("Photo does not found");
		}

		res.status(StatusCodes.Ok200).send({ photo });
		return;
	} catch (error) {
		throw error;
	}
};

const createPhoto = async (
	req: Request<never, never, CreatePhotoDto, never>,
	res: Response
): Promise<void> => {
	try {
		const photoDto = req.body;

		const existingUser = await userRepository.getById(photoDto.userId);

		if (!existingUser) {
			throw new BadRequestError(
				"Photo must be tied by User, however User your provided does not exist"
			);
		}

		const photo = await photoRepository.add(photoDto);

		res.status(StatusCodes.Created201).send({
			msg: "Photo succesfuly added",
			photo,
		});
		return;
	} catch (error) {
		throw error;
	}
};

export { getAllPhoto, getPhotoById, createPhoto };
