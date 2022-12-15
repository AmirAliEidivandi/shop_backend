import { UploadedFile } from "express-fileupload";
import { hashFromUUID } from "./HashService";
const ROOT_PATH: string = process.env.APP_ROOT as string;
const CONTENT_PATH = "/public/contents/";

export default class UploadService {
    private readonly basePath: string;
    constructor() {
        this.basePath = `${ROOT_PATH}${CONTENT_PATH}`;
    }

    public async upload(file: UploadedFile): Promise<string> {
        const fileNewName: string = this.generateName(file.name);
        await file.mv(`${this.basePath}${fileNewName}`);
        return fileNewName;
    }

    public async uploadMany(files: UploadedFile[]): Promise<string[]> {
        const newFilesNames: string[] = [];
        files.forEach(async (file: UploadedFile) => {
            const newFileName = await this.upload(file);
            newFilesNames.push(newFileName);
        });
        return newFilesNames;
    }

    private generateName(fileName: string): string {
        const fileExtension: string = fileName.split(".").pop() as string;
        const newFileName: string = hashFromUUID();
        return `${newFileName}.${fileExtension}`;
    }
}
