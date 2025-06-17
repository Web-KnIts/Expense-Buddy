
export interface iloginCredential{
    email:string,
    password:string,
    error?:string
}

export interface isignupCredential extends iloginCredential{
   fullname:string,
   confirmPassword:string
}