import { UploadedFile } from "express-fileupload";
import { join } from "path";
import { hashFromUUID } from "./HashService";
const ROOT_PATH: string = process.cwd();
const CONTENT_PATH = "/public/contents/";

export default class UploadService {
    private readonly basePath: string;
    constructor() {
        this.basePath = join(ROOT_PATH, CONTENT_PATH);
    }

    public async upload(file: UploadedFile): Promise<string> {
        const fileNewName: string = this.generateName(file.name);
        await file.mv(`${this.basePath}${fileNewName}`);
        return fileNewName;
    }

    public async uploadMany(files: UploadedFile[]): Promise<string[]> {
        const newFilesNames: string[] = [];
        for (let i = 0; i < files.length; i++) {
            const newFileName = await this.upload(files[i]);
            newFilesNames.push(newFileName);
        }
        return newFilesNames;
    }

    private generateName(fileName: string): string {
        const fileExtension: string = fileName.split(".").pop() as string;
        const newFileName: string = hashFromUUID();
        return `${newFileName}.${fileExtension}`;
    }
}
