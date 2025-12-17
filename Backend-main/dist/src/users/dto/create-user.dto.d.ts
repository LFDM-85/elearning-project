export declare class CreateUserDto {
    name: string;
    image?: string;
    email: string;
    password: string;
    refreshToken?: string;
    roles: string[];
    isValidated: boolean;
}
