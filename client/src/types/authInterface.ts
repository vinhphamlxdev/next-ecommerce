export interface IUser {
  id: number;
  fullName: string;
  email: string;
  enabled: boolean;
  createdAt: string;
  roles: IRole[];
}

export interface IRole {
  id: number;
  name: string;
}
export interface ILoginResponse {
  status: string;
  access_token: string;
  user: IUser;
}
export interface IFormLogin {
  email: string;
  password: string;
}
export interface IDecodeToken {
  exp: number;
  iat: number;
  iss: string;
  roles: string;
  sub: string;
}
