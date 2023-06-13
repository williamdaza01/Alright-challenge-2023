export class CreateUserDTO {
    name?: string;
    lastname?: string;
    email: string;
    password: string;
    isReviewer?: boolean;
    createdAt?: Date;
}