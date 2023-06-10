export interface IUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  phone:number;
}

export interface IUser2 {
  first_name: string;
  last_name: string;
  phone_number:string;
  email:string;
  role: "client" | "admin" ;
  password:string;
  password_confirmation:string;
  currency:string,
  id?: number,
  balance?:number
}