import { PostModel } from "./post.model";

export class InterestModel {
    idInterest: number;
    text: string;
    mediaIds?: number[];
    userIds?: number[];
    postIds?: number[];
    posts?: PostModel[];
}