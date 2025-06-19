
export interface iloginCredential{
    email:string,
    password:string,
    error?:string
}

export interface isignupCredential extends iloginCredential{
   fullname:string,
   confirmPassword:string
}


// export interface iLoginResponse{
//     status:string | number;
//     message:string;
//     id?:string,
//     user?:;
//     token?:string;
// }
