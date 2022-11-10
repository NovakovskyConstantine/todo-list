export interface IParams {
    login?: string;
    password? :string;
    token?: string;
    rights: string;
}

export interface ILoggedUser {
    token: string;
    rights: string;
}