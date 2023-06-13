import { StateType } from "src/utils/types";

export class CreateDocumentDTO {
    title: string;
    file: Express.Multer.File;
    state?: StateType;
    reviewer?: string;
}