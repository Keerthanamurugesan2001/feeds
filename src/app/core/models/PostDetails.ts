export interface PostDetails {

    id?: number;
    title: string;
    body: string;
    userId: number;
    isGlobal: boolean;
    isComment: boolean;
    tag: string;
    createdAt: Date;
    updatedAt: Date;

}