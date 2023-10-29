import { CreatePhotoDto } from "../dto/photo.dto.js";
import Photo from "../models/photo.model.js";
import { v4 as uuidv4 } from "uuid";

class PhotoRepository {
	protected readonly photoModel: typeof Photo;
	constructor() {
		this.photoModel = Photo;
	}

	async getAllWithFilter(
		filter?: Record<string, string | number | boolean>,
		include?: string
	): Promise<Photo[]> {
		let result: Photo[] = [];
		try {
			if (!filter) {
				result = await this.photoModel.findAll({ include: include });
			} else {
				result = await this.photoModel.findAll({
					where: filter,
					include: include,
				});
			}

			return result;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	async getPhotosByUserId(userId: string): Promise<Photo[]> {
		const result = await this.photoModel.findAll({ where: { userId } });

		return result;
	}

	async getById(id: string, include?: string): Promise<Photo | null> {
		if (!this.validatePhotoIdUUID(id)) {
			return null;
		}

		const photo = await this.photoModel.findByPk(id, {
			include: include,
		});

		return photo;
	}

	async add(photo: CreatePhotoDto): Promise<Photo> {
		const id = this.generatePkId();
		const result = await this.photoModel.create({
			id,
			title: photo.title,
			caption: photo.caption,
			imageUrl: photo.imageUrl,
			UserId: photo.userId,
		});

		return result;
	}

	generatePkId(): string {
		return uuidv4();
	}

	validatePhotoIdUUID(id: string): boolean {
		const regexExp =
			/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

		return regexExp.test(id);
	}
}

export default new PhotoRepository();
