import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private issuer = {
    login   : 'http://127.0.0.1:8000/api/auth/login',
    register: 'http://127.0.0.1:8000/api/auth/register'
  }

  constructor() { }

  handleData(token){
    console.log('handleData TokenService ===>',token)
    localStorage.setItem('auth_token', token);
  }

  getToken(){
    // console.log('getToken ====>',localStorage.getItem('auth_token'))
    // console.log('getToken ====>',localStorage.getItem('token'))
    return localStorage.getItem('auth_token');
  
  }

  // Verify the token
  isValidToken(){
     const token = this.getToken();
    //  console.log('token | isValidToken===>',token)

     if(token){
       const payload = this.payload(token);
       if(payload){
         return Object.values(this.issuer).indexOf(payload.iss) > -1 ? true : false;
       }
     } else {
        return false;
     }
  }

  payload(token) {
    // console.log('token | payload===>',token)
    const jwtPayload = token.split('.')[1];
    return JSON.parse(atob(jwtPayload));
  }

  // User state based on valid token
  isLoggedIn() {
    return this.isValidToken();
  }

  // Remove token
  removeToken(){
    localStorage.removeItem('auth_token');
  }

  
}
