import {PostModel} from "./post.model";

export class UserModel {
    name: string
    email?: string
    password?: string
    imageUrl?: string
    bio?: string
    birthdate?: Date
    createdAt?: Date
    idRole?: number
    gender?: string
    interests?: number[]
    posts?: PostModel[]
    idUser: number
    userRank?: number
}
