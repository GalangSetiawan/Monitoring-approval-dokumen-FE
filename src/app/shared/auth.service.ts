import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// User interface
export class User {
  // name: String;
  // email: String;
  // password: String;
  // password_confirmation: String


  id      : Number;
  nama    : String;
  NIP     : String;
  ppkId   : Number;
  satkerId: Number;
  roleId  : Number;
  roleName: String;
  username: String;
  email   : String;
  email2   : String;
  email3   : String;
  foto    : FileList;
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


  

  register(user: User){
    
    var modelUser = {
      nama                 : String(user.nama),
      username             : String(user.username),
      NIP                  : String(user.NIP),
      email                : String(user.email),
      email2                : String(user.email2),
      email3                : String(user.email3),
      ppkId                : String(user.ppkId),
      satkerId             : String(user.satkerId),
      roleId               : String(user.roleId),
      roleName             : String(user.roleName),
      password             : String(user.password),
      password_confirmation: String(user.password_confirmation),
    }

    var formData = new FormData();
    Array.from(user.foto).forEach(f => formData.append('foto',f))
    formData.append('nama',modelUser.nama)
    formData.append('username',modelUser.username)
    formData.append('NIP',modelUser.NIP)
    formData.append('email',modelUser.email)
    formData.append('email2',modelUser.email2)
    formData.append('email3',modelUser.email3)
    formData.append('ppkId',modelUser.ppkId)
    formData.append('satkerId',modelUser.satkerId)
    formData.append('roleId',modelUser.roleId)
    formData.append('roleName',modelUser.roleName)
    formData.append('password',modelUser.password)
    formData.append('password_confirmation',modelUser.password_confirmation)

    return this.http.post('http://127.0.0.1:8000/api/auth/register', formData);
  }





  updateUser(user:User,isEditImage) {

    var modelUser = {
      id                   : String(user.id),
      nama                 : String(user.nama),
      username             : String(user.username),
      NIP                  : String(user.NIP),
      email                : String(user.email),
      email2                : String(user.email2),
      email3                : String(user.email3),
      ppkId                : String(user.ppkId),
      satkerId             : String(user.satkerId),
      roleId               : String(user.roleId),
      roleName             : String(user.roleName),
      password             : String(user.password),
      password_confirmation: String(user.password_confirmation)
    }


    var formData = new FormData();
    if(isEditImage)Array.from(user.foto).forEach(f => formData.append('foto',f))
    formData.append('id',modelUser.id)
    formData.append('nama',modelUser.nama)
    formData.append('username',modelUser.username)
    formData.append('NIP',modelUser.NIP)
    formData.append('email',modelUser.email)
    formData.append('email2',modelUser.email2)
    formData.append('email3',modelUser.email3)
    formData.append('ppkId',modelUser.ppkId)
    formData.append('satkerId',modelUser.satkerId)
    formData.append('roleId',modelUser.roleId)
    formData.append('roleName',modelUser.roleName)
    formData.append('password',modelUser.password)
    formData.append('password_confirmation',modelUser.password_confirmation)
    return this.http.post('http://127.0.0.1:8000/api/auth/edit-data/' +user.id, formData);
  }


  checkUsername(username): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/auth/check-username', username);
  }


  checkEmail(email): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/auth/check-email', email);
  }

  gantiPassword(id,password){
    return this.http.post('http://127.0.0.1:8000/api/auth/change-password/' +id, password);

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
