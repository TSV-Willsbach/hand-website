export interface Roles {
    admin?: boolean;
    editor?: boolean;
    sponsor?: boolean;
}

export interface User {
    uid: string;
    displayName: string;
    email: string;
    roles: Roles;
}
