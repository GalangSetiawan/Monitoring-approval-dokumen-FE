import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MasterppkService {

  constructor(private http: HttpClient) { }

  createPPK(dataPPK): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/ppk/add-data', dataPPK);
  }

  updatePPK(dataPPK): Observable<any> {
    return this.http.patch<any>('http://127.0.0.1:8000/api/ppk/edit-data/'+dataPPK.id, dataPPK);
  }

  getPPK(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/ppk/get-data');
  }

  getPPKbyId(idPPK): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/ppk/get-data-by/'+idPPK);
  }

  deletePPK(dataPPK): Observable<any> {
    return this.http.delete('http://127.0.0.1:8000/api/ppk/delete-data/'+dataPPK.id);
  }

  searchPPK(filter): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/ppk/search',filter);
  }


}
