export interface DecodedToken {
  id: number;
  email: string;
  roleId: number; 
  exp?: number;
}