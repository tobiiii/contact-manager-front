export class User {
  id?: number;
  username: string | undefined;
  firstName?: string;
  lastName?: string;
  token!: string;
  privileges?:any[];
  redirectTo?:string;
  refreshToken!:string;
  appBuildInfo? : string;
  profile?:string;
}
