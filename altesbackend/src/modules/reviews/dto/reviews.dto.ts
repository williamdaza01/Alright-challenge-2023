import { StateType } from "src/utils/types";

export class CreateReviewDTO {
    idFile: string;
    fileTitle: string;
    state?: StateType;
}