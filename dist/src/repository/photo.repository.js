import Photo from "../models/photo.model.js";
import { v4 as uuidv4 } from "uuid";
class PhotoRepository {
    photoModel;
    constructor() {
        this.photoModel = Photo;
    }
    async getAllWithFilter(filter, include) {
        let result = [];
        if (!filter) {
            result = await this.photoModel.findAll({ include: include });
        }
        else {
            result = await this.photoModel.findAll({
                where: filter,
                include: include,
            });
        }
        return result;
    }
    async getPhotosByUserId(userId) {
        const result = await this.photoModel.findAll({ where: { userId } });
        return result;
    }
    async getById(id, include) {
        if (!this.validatePhotoIdUUID(id)) {
            return null;
        }
        const photo = await this.photoModel.findByPk(id, {
            include: include,
        });
        return photo;
    }
    async add(photo) {
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
    generatePkId() {
        return uuidv4();
    }
    validatePhotoIdUUID(id) {
        const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
        return regexExp.test(id);
    }
}
export default new PhotoRepository();
//# sourceMappingURL=photo.repository.js.map