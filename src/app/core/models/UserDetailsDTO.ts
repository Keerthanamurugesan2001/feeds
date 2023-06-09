export interface UserDetailsDTO {

    id?: number;
    title: string;
    body: string;
    userId: number;
    isGlobal: boolean;
    tag: string[];
    createdAt: Date;
    updatedAt: Date;

}