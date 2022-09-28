export interface NewUser {
    id: number;
    name: string;
    email: string;
    password: string;
    isActive: boolean;
}

export interface Login {
    email: string;
    password: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    isActive: boolean;
    jwtToken: string;
}