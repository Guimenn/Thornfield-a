declare module 'firebase/app' {
  export function initializeApp(config: any): any;
}

declare module 'firebase/auth' {
  export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  }
  
  export interface UserCredential {
    user: User;
  }
  
  export function getAuth(app?: any): any;
  export class GoogleAuthProvider {
    constructor();
    setCustomParameters(params: { [key: string]: string }): void;
  }
  export function signInWithPopup(auth: any, provider: any): Promise<UserCredential>;
  export function createUserWithEmailAndPassword(auth: any, email: string, password: string): Promise<UserCredential>;
  export function signInWithEmailAndPassword(auth: any, email: string, password: string): Promise<UserCredential>;
} 