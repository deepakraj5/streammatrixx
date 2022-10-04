export interface InsertVideoURLDTO {
    userId: number;
    playListId?: number;
    url: string;
    title: string;
    description?: string;
}

export interface UploadVideoToS3DTO {
    userId: number;
    playListId?: number;
    title: string;
    description?: string;
    data: string;
    format: string;
}