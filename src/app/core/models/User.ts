export interface User{
  "userId"?: number;
  "userName": string,
  "email": string,
  "password": string,
  "createdAt": string,
  "updatedAt": string
}

export interface UserCredential{
  "email": string,
  "password": string,
}

export interface UserToken{
  "access_token"?: string,
  "message"?: string,
  "user": User
}
