export interface Logins {
    email: string;
    password: string;
}

export interface LoginResp {
    id : string;
    email : string;
    fname : string;
    lname : string
    token : string
}

export interface Signups {
    fname: string;
    lname: string;
    username: string;
    email: string;
    password: string;
}