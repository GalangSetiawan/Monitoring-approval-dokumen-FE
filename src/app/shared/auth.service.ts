import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// User interface
export class User {
  // name: String;
  // email: String;
  // password: String;
  // password_confirmation: String


  nama    : String;
  cabang  : String;
  jabatan : String;
  roleId    : String;
  username: String;
  email   : String;
  password: String;
  password_confirmation: String;

  
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) { }

  getAllUser(){
    return this.http.get('http://127.0.0.1:8000/api/auth/get-user');
  }

  getUserById(userId): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/auth/get-user/'+userId);
  }

  deleteUser(dataUser): Observable<any> {
    return this.http.delete('http://127.0.0.1:8000/api/auth/delete-data/'+dataUser.id);
  }

  register(user: User): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/auth/register', user);
  }


  checkEmail(email): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/auth/check-email', email);
  }
  
  
  checkPassword(id, password): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/auth/check-password/' + id, password);
  }


  searchUser(filter): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/auth/search',filter);
  }

  // Login
  signin(user: User): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/auth/login', user);
  }

  // Access user profile
  profileUser(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/auth/user');
  }


}
