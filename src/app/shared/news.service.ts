import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const API_URL = "http://127.0.0.1:8000/api";

export class newsStyle {
  id      : Number;
  title   : Number;
  body    : String;
  bgImage : FileList;
  isActive: Number;
  imageName:String
  } 

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  createNews(dataNews:newsStyle): Observable<any> {

    var modelBerita = {
      id       : String(dataNews.id),
      title    : String(dataNews.title),
      body     : String(dataNews.body),
      isActive : String(dataNews.isActive),
      imageName: String(dataNews.imageName),
    }

    var formData = new FormData();
    Array.from(dataNews.bgImage).forEach(f => formData.append('bgImage',f))
    formData.append('id',modelBerita.id)
    formData.append('title',modelBerita.title)
    formData.append('body',modelBerita.body)
    formData.append('isActive',modelBerita.isActive)
    formData.append('imageName',modelBerita.imageName)


    return this.http.post(API_URL+'/news/add-data', formData, {reportProgress: true, observe: 'events'});
  }

  updateNews(dataNews:newsStyle): Observable<any> {

    var modelBerita = {
      id       : String(dataNews.id),
      title    : String(dataNews.title),
      body     : String(dataNews.body),
      isActive : String(dataNews.isActive),
      imageName: String(dataNews.imageName),

    }

    var formData = new FormData();
    Array.from(dataNews.bgImage).forEach(f => formData.append('bgImage',f))
    formData.append('id',modelBerita.id)
    formData.append('title',modelBerita.title)
    formData.append('body',modelBerita.body)
    formData.append('isActive',modelBerita.isActive)
    formData.append('imageName',modelBerita.imageName)


    // return this.http.post(API_URL+'/news/add-data', formData, {reportProgress: true, observe: 'events'});


    return this.http.post<any>(API_URL+'/news/edit-data/'+modelBerita.id, formData, {reportProgress: true, observe: 'events'});
  }

  getNews(): Observable<any> {
    return this.http.get(API_URL+'/news/get-data');
  }

  downloadImage(imageName): Observable<any> {
    return this.http.get(API_URL+'/download/download-image/'+imageName);
  }

  getNewsbyId(idNews): Observable<any> {
    return this.http.get(API_URL+'/news/get-data-by/'+idNews);
  }

  deleteNews(dataNews): Observable<any> {
    return this.http.delete(API_URL+'/news/delete-data/'+dataNews.id);
  }

  searchNews(filter): Observable<any> {
    return this.http.post(API_URL+'/news/search',filter);
  }

  switchActiveData(data): Observable<any>{
    return this.http.post(API_URL+'/news/is-active/' + data.id ,data);
  }


}
