export interface Roles {
    admin?: boolean;
    editor?: boolean;
    sponsor?: boolean;
}

export interface User {
    uid: string;
    email: string;
    roles: Roles;
}