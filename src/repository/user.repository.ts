import User from "../models/user.model.js";
import { CreateUserDTO, LoginDTO, LoginResponseDTO } from "../dto/user.dto.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import Photo from "../models/photo.model.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

class UserRepository {
	protected readonly userModel: typeof User;
	constructor() {
		this.userModel = User;
	}

	async getAllWithFilter(
		filter?: Record<string, number | boolean>
	): Promise<User[]> {
		let result: User[] = [];

		if (!filter) {
			result = await this.userModel.findAll();
		} else {
			result = await this.userModel.findAll({
				where: filter,
			});
		}
		return result;
	}

	async getAllIncludePhoto(
		filter?: Record<string, number | boolean>
	): Promise<User[]> {
		let result: User[] = [];

		if (!filter) {
			result = await this.userModel.findAll({ include: Photo });
		} else {
			result = await this.userModel.findAll({
				where: filter,
				include: Photo,
			});
		}

		return result;
	}

	async getByEmail(email: string): Promise<User | null> {
		return await this.userModel.findOne({ where: { email } });
	}

	async getById(id: string): Promise<User | null> {
		if (!this.validateUserIdUUID(id)) {
			return null;
		}

		return await this.userModel.findByPk(id);
	}

	async add(user: CreateUserDTO): Promise<void> {
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

	async login(userLogin: LoginDTO): Promise<LoginResponseDTO | null> {
		const user = await this.userModel.findOne({
			where: { email: userLogin.email },
		});

		if (!user) {
			return null;
		}

		const isMatched = await bcrypt.compare(
			userLogin.password,
			user.password
		);

		if (!isMatched) {
			return null;
		}

		const token = jwt.sign(
			{ username: user.username, email: user.email },
			JWT_SECRET
		);
		const result: LoginResponseDTO = {
			userId: user.id,
			username: user.username,
			email: user.email,
			token,
		};

		return result;
	}

	generatePkId(): string {
		return uuidv4();
	}

	validateUserIdUUID(id: string): boolean {
		const regexExp =
			/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

		return regexExp.test(id);
	}
}

export default new UserRepository();
