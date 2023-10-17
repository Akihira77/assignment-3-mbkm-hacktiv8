export interface UserModel {
    id: string;
    username: string;
    email: string;
    password: string;
}

export interface CreateUserDTO {
    username: string;
    email: string;
    password: string;
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface LoginResponseDTO {
    userId: string;
    username: string;
    email: string;
    token: string;
}
