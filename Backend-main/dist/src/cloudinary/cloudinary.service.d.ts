/// <reference types="multer" />
export declare class CloudinaryService {
    uploadfile(file: Express.Multer.File): Promise<(resolve: any, reject: any) => void>;
}
