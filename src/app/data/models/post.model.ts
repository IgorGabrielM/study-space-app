import { CommentModel } from "./comment.model";
import { InterestModel } from "./interest.model";
import { UserModel } from "./user.model";

export class PostModel {
    idPost?: number;
    title: string;
    text?: string;
    imageUrl?: string;
    likesCount?: number;
    createdAt?: Date;
    updatedAt?: Date;
    userId?: number;
    insterestsId?: number[];
    interests?: InterestModel[];
    user?: UserModel;
    commentsCount: number;
    comments: CommentModel[];
    likes: UserModel[];
}
