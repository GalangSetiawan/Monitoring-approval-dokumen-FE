import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MastercabangService {

  constructor(private http: HttpClient) { }

  createCabang(dataCabang): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/cabang/add-data', dataCabang);
  }

  updateCabang(dataCabang): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/cabang/edit-data/'+dataCabang.id, dataCabang);
  }

  getCabang(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/cabang/get-data');
  }

  getCabangbyId(idCabang): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/cabang/get-data-by/'+idCabang);
  }

  deleteCabang(dataCabang): Observable<any> {
    return this.http.delete('http://127.0.0.1:8000/api/cabang/delete-data/'+dataCabang.id);
  }

  searchCabang(filter): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/cabang/search',filter);
  }


}
