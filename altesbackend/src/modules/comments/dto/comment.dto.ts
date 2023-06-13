import { StateType } from "src/utils/types";

export class CreateCommentDTO {
    idOwner: string;
    idFile: string;
    nameOwner: string;
    description: string;
    state?: StateType;
}