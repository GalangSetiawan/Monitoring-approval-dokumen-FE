import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const API_URL = "http://127.0.0.1:8000/api";


@Injectable({
  providedIn: 'root'
})
export class DokumenserviceService {

  constructor(private http: HttpClient) { }




  // =========== GET JENIS & TIPE DOKUMEN =============
  getJenisDokumenTemuan(): Observable<any> {
    return this.http.get(API_URL+'/jenisdokumentemuan/get-data');
  }


  getTipeDokumen(): Observable<any> {
    return this.http.get(API_URL+'/tipeDokumen/get-data');
  }
  // =========== GET JENIS & TIPE DOKUMEN =============


  getDetailDokumen(tipeDokumenId,dokumenId): Observable<any> {
    return this.http.get(API_URL+'/dokumen/'+tipeDokumenId +'/'+dokumenId);
  }



  getDokumenTemuanGridView(): Observable<any> {
    return this.http.get(API_URL+'/dokumentemuan/grid-view');
  }

  getDetailDokumenTemuanGridView(id): Observable<any> {
    return this.http.get(API_URL+'/dokumentemuan/get-detail-data/'+id);
  }

  


  // =========== DOKUMEN TEMUAN =============
  createDokumenTemuan(dataDokumenTemuan): Observable<any> {
    return this.http.post(API_URL+'/dokumentemuan/add-data', dataDokumenTemuan);
  }

  updateDokumenTemuan(dataDokumenTemuan): Observable<any> {
    return this.http.post<any>(API_URL+'/dokumentemuan/edit-data/'+dataDokumenTemuan.id, dataDokumenTemuan);
  }

  getDokumenTemuan(): Observable<any> {
    return this.http.get(API_URL+'/dokumentemuan/get-data');
  }

  getDokumenTemuanbyId(idDokumenTemuan): Observable<any> {
    return this.http.get(API_URL+'/dokumentemuan/get-data-by/'+idDokumenTemuan);
  }

  deleteDokumenTemuan(dataDokumenTemuan): Observable<any> {
    return this.http.delete(API_URL+'/dokumentemuan/delete-data/'+dataDokumenTemuan.id);
  }

  searchDokumenTemuan(filter): Observable<any> {
    return this.http.post(API_URL+'/dokumentemuan/search',filter);
  }
  // =========== DOKUMEN TEMUAN =============


    // =========== DOKUMEN TINDAK LANJUT =============
    createTindakLanjut(dataTindakLanjut): Observable<any> {
      return this.http.post(API_URL+'/tindaklanjut/add-data', dataTindakLanjut);
    }
  
    updateTindakLanjut(dataTindakLanjut): Observable<any> {
      return this.http.post<any>(API_URL+'/tindaklanjut/edit-data/'+dataTindakLanjut.id, dataTindakLanjut);
    }
  
    getTindakLanjut(): Observable<any> {
      return this.http.get(API_URL+'/tindaklanjut/get-data');
    }
  
    getTindakLanjutbyId(idTindakLanjut): Observable<any> {
      return this.http.get(API_URL+'/tindaklanjut/get-data-by/'+idTindakLanjut);
    }
  
    deleteTindakLanjut(dataTindakLanjut): Observable<any> {
      return this.http.delete(API_URL+'/tindaklanjut/delete-data/'+dataTindakLanjut.id);
    }
  
    searchTindakLanjut(filter): Observable<any> {
      return this.http.post(API_URL+'/tindaklanjut/search',filter);
    }
    // =========== DOKUMEN TINDAK LANJUT =============



    
    
    // =========== RESPON DOKUMEN TINDAK LANJUT =============
    createResponTindakLanjut(dataResponTindakLanjut): Observable<any> {
      return this.http.post(API_URL+'/respontindaklanjut/add-data', dataResponTindakLanjut);
    }
  
    updateResponTindakLanjut(dataResponTindakLanjut): Observable<any> {
      return this.http.post<any>(API_URL+'/respontindaklanjut/edit-data/'+dataResponTindakLanjut.id, dataResponTindakLanjut);
    }
  
    getResponTindakLanjut(): Observable<any> {
      return this.http.get(API_URL+'/respontindaklanjut/get-data');
    }
  
    getResponTindakLanjutbyId(idResponTindakLanjut): Observable<any> {
      return this.http.get(API_URL+'/respontindaklanjut/get-data-by/'+idResponTindakLanjut);
    }
  
    deleteResponTindakLanjut(dataResponTindakLanjut): Observable<any> {
      return this.http.delete(API_URL+'/respontindaklanjut/delete-data/'+dataResponTindakLanjut.id);
    }
  
    searchResponTindakLanjut(filter): Observable<any> {
      return this.http.post(API_URL+'/respontindaklanjut/search',filter);
    }
    // =========== RESPON DOKUMEN TINDAK LANJUT =============




    // =========== RESPON DOKUMEN TINDAK LANJUT =============
    createDokumen(dataDokumen): Observable<any> {
      return this.http.post(API_URL+'/dokumen/add-data', dataDokumen);
    }
  
    updateDokumen(dataDokumen): Observable<any> {
      return this.http.post<any>(API_URL+'/dokumen/edit-data/'+dataDokumen.id, dataDokumen);
    }
  
    getDokumen(): Observable<any> {
      return this.http.get(API_URL+'/dokumen/get-data');
    }
  
    getDokumenbyId(idDokumen): Observable<any> {
      return this.http.get(API_URL+'/dokumen/get-data-by/'+idDokumen);
    }
  
    deleteDokumen(dataDokumen): Observable<any> {
      return this.http.delete(API_URL+'/dokumen/delete-data/'+dataDokumen.id);
    }
  
    searchDokumen(filter): Observable<any> {
      return this.http.post(API_URL+'/dokumen/search',filter);
    }
    // =========== RESPON DOKUMEN TINDAK LANJUT =============
  







}
