import { UserModel } from "./user.model";

export class CommentModel {
    text: string;
    createdAt?: Date;
    updatedAt?: Date;
    postId: number;
    userId: number;
    user?: UserModel;
}