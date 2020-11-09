import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MasterppkService {

  constructor(private http: HttpClient) { }

  createPPK(dataPPK): Observable<any> {
    return this.http.post('http://mad-be.kenangncode.com/api/ppk/add-data', dataPPK);
  }

  updatePPK(dataPPK): Observable<any> {
    return this.http.post<any>('http://mad-be.kenangncode.com/api/ppk/edit-data/'+dataPPK.id, dataPPK);
  }

  getPPK(): Observable<any> {
    return this.http.get('http://mad-be.kenangncode.com/api/ppk/get-data');
  }

  getPPKbyId(idPPK): Observable<any> {
    return this.http.get('http://mad-be.kenangncode.com/api/ppk/get-data-by/'+idPPK);
  }

  deletePPK(dataPPK): Observable<any> {
    return this.http.delete('http://mad-be.kenangncode.com/api/ppk/delete-data/'+dataPPK.id);
  }

  searchPPK(filter): Observable<any> {
    return this.http.post('http://mad-be.kenangncode.com/api/ppk/search',filter);
  }


}

// const API_URL = "http://mad-be.kenangncode.com/api";