import { CommentModel } from "./comment.model";
import { InterestModel } from "./interest.model";
import { UserModel } from "./user.model";

export class MediaModel {
    title: string;
    description?: string;
    imageUrl?: string;
    institution?: string;
    type?: string;
    users?: any[];
    interestIds?: number[];
    idUser?: number;
    link?: string;
  idMedia?: number;
}
