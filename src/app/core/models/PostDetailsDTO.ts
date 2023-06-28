import { CommentDetails } from "./CommentDetails";

export interface PostDetailsDTO {

    id?: number;
    title: string;
    body: string;
    userId: number;
    isGlobal: boolean;
    isComment: boolean;
    tag: string[];
    comments?: CommentDetails[]; 
    createdAt: Date;
    updatedAt: Date;

}