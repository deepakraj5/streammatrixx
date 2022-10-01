export interface PlayListDTO {
    name: string;
    userId: number;
}

export interface PlayListByIdDTO {
    id: number;
    userId: number;
}

export interface DeletePlayListById {
    id: number;
    userId: number;
}