
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface LoginUserInput {
    username: string;
    password: string;
}

export interface CreateUserInput {
    username?: Nullable<string>;
    password?: Nullable<string>;
}

export interface LoginResponse {
    user: User;
    token: string;
}

export interface IMutation {
    login(loginUserInput: LoginUserInput): LoginResponse | Promise<LoginResponse>;
    signup(loginUserInput: LoginUserInput): User | Promise<User>;
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
}

export interface User {
    id: number;
    username?: Nullable<string>;
    avatar?: Nullable<string>;
}

export interface IQuery {
    users(): Nullable<User>[] | Promise<Nullable<User>[]>;
    user(username: string): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
