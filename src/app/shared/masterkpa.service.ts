import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


// export class dataKPA {
//   namaKPA     : String;
//   cabang      : String;
//   alamatCabang: String;
  
// }

@Injectable({
  providedIn: 'root'
})
export class MasterkpaService {

  constructor(private http: HttpClient) { }



    createKPA(dataKPA): Observable<any> {
      return this.http.post('http://127.0.0.1:8000/api/kpa/add-data', dataKPA);
    }
  
    updateKPA(dataKPA): Observable<any> {
      return this.http.post<any>('http://127.0.0.1:8000/api/kpa/edit-data/'+dataKPA.id, dataKPA);
    }
  
    getKPA(): Observable<any> {
      return this.http.get('http://127.0.0.1:8000/api/kpa/get-data');
    }

    getKPAbyId(idKPA): Observable<any> {
      return this.http.get('http://127.0.0.1:8000/api/kpa/get-data-by/'+idKPA);
    }

    deleteKPA(dataKPA): Observable<any> {
      return this.http.delete('http://127.0.0.1:8000/api/kpa/delete-data/'+dataKPA.id);
    }

    searchKPA(filter): Observable<any> {
      return this.http.post('http://127.0.0.1:8000/api/kpa/search',filter);
    }




    

}
