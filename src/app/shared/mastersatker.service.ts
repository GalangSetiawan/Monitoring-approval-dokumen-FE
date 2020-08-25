import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const API_URL = "http://127.0.0.1:8000/api";


@Injectable({
  providedIn: 'root'
})
export class MastersatkerService {

  constructor(private http: HttpClient) { }

  createSatker(dataSatker): Observable<any> {
    return this.http.post(API_URL+'/satker/add-data', dataSatker);
  }

  updateSatker(dataSatker): Observable<any> {
    return this.http.post<any>(API_URL+'/satker/edit-data/'+dataSatker.id, dataSatker);
  }

  getSatker(): Observable<any> {
    return this.http.get(API_URL+'/satker/get-data');
  }

  getSatkerbyId(idSatker): Observable<any> {
    return this.http.get(API_URL+'/satker/get-data-by/'+idSatker);
  }

  deleteSatker(dataSatker): Observable<any> {
    return this.http.delete(API_URL+'/satker/delete-data/'+dataSatker.id);
  }

  searchSatker(filter): Observable<any> {
    return this.http.post(API_URL+'/satker/search',filter);
  }


}
