export interface PhotoModel {
    id: string;
    title: string;
    caption: string;
    imageUrl: string;
}

export interface CreatePhotoDto {
    title: string;
    caption: string;
    imageUrl: string;
    userId: string;
}
