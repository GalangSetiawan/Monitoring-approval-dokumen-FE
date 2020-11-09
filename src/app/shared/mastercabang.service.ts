import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MastercabangService {

  constructor(private http: HttpClient) { }

  createCabang(dataCabang): Observable<any> {
    return this.http.post('http://mad-be.kenangncode.com/api/cabang/add-data', dataCabang);
  }

  updateCabang(dataCabang): Observable<any> {
    return this.http.post<any>('http://mad-be.kenangncode.com/api/cabang/edit-data/'+dataCabang.id, dataCabang);
  }

  getCabang(): Observable<any> {
    return this.http.get('http://mad-be.kenangncode.com/api/cabang/get-data');
  }

  getCabangbyId(idCabang): Observable<any> {
    return this.http.get('http://mad-be.kenangncode.com/api/cabang/get-data-by/'+idCabang);
  }

  deleteCabang(dataCabang): Observable<any> {
    return this.http.delete('http://mad-be.kenangncode.com/api/cabang/delete-data/'+dataCabang.id);
  }

  searchCabang(filter): Observable<any> {
    return this.http.post('http://mad-be.kenangncode.com/api/cabang/search',filter);
  }


}
