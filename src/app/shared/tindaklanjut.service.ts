import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders,HttpParams  } from '@angular/common/http';



const API_URL = "http://127.0.0.1:8000/api";



export class tindakLanjutStyleCreate {
  dokumenTemuanId           : Number;
  ppkId                     : Number;
  dokumenId                 : Number;
  tglTindakLanjut           : string;
  dokumenTindakLanjut       : FileList;

  _tipeDokumenId            : String;
  _noUraianTemuan           : String;
  _uraianTemuan             : String;
  _rekomendasi              : String;
  _kodeRekomendasi          : String;
  _kodeRingkasanTindakLanjut: String;
  _ringkasanTindakLanjut    : String;
  _statusTindakLanjut       : String;
  _tindakLanjut             : String;
  _subNomorRekomendasi      : String;
  _nomorHeader              : String;
  _titleHeader              : String;
  _satkerId                 : String;
  _ppkId                    : String;
  _dokumenTemuanId          : String;
  } 

  export class tindakLanjutStyleUpdate {
    id                        : Number;
    dokumenTemuanId           : Number;
    ppkId                     : Number;
    dokumenId                 : Number;
    tglTindakLanjut           : string;
    dokumenTindakLanjut       : FileList;
  
    _tipeDokumenId            : String;
    _noUraianTemuan           : String;
    _uraianTemuan             : String;
    _rekomendasi              : String;
    _kodeRekomendasi          : String;
    _kodeRingkasanTindakLanjut: String;
    _ringkasanTindakLanjut    : String;
    _statusTindakLanjut       : String;
    _tindakLanjut             : String;
    _subNomorRekomendasi      : String;
    _nomorHeader              : String;
    _titleHeader              : String;
    _satkerId                 : String;
    _ppkId                    : String;
    _dokumenTemuanId          : String;
    } 



@Injectable({
  providedIn: 'root'
})
export class TindaklanjutService {

  constructor(private http: HttpClient) { }





  getDetailTindakLanjut(id,dokumenTemuanId){
    return this.http.get(API_URL+'/tindaklanjut/get-detail-data/'+id+'/'+dokumenTemuanId);
  }


  createTindakLanjut(dataTindakLanjut:tindakLanjutStyleCreate){
    console.log('dataTindakLanjut createTindakLanjut ===>',dataTindakLanjut)

    var modelTindakLanjut = {
      dokumenTemuanId           : String(dataTindakLanjut.dokumenTemuanId),
      ppkId                     : String(dataTindakLanjut.ppkId),
      dokumenId                 : String(dataTindakLanjut.dokumenId),
      tglTindakLanjut           : String(dataTindakLanjut.tglTindakLanjut),
      _tipeDokumenId            : String(dataTindakLanjut._tipeDokumenId),
      _noUraianTemuan           : String(dataTindakLanjut._noUraianTemuan),
      _uraianTemuan             : String(dataTindakLanjut._uraianTemuan),
      _rekomendasi              : String(dataTindakLanjut._rekomendasi),
      _kodeRekomendasi          : String(dataTindakLanjut._kodeRekomendasi),
      _kodeRingkasanTindakLanjut: String(dataTindakLanjut._kodeRingkasanTindakLanjut),
      _ringkasanTindakLanjut    : String(dataTindakLanjut._ringkasanTindakLanjut),
      _statusTindakLanjut       : String(dataTindakLanjut._statusTindakLanjut),
      _tindakLanjut             : String(dataTindakLanjut._tindakLanjut),
      _subNomorRekomendasi      : String(dataTindakLanjut._subNomorRekomendasi),
      _nomorHeader              : String(dataTindakLanjut._nomorHeader),
      _titleHeader              : String(dataTindakLanjut._titleHeader),
      _satkerId                 : String(dataTindakLanjut._satkerId),
      _ppkId                    : String(dataTindakLanjut._ppkId),
      _dokumenTemuanId          : String(dataTindakLanjut._dokumenTemuanId),

    };
    var formData = new FormData();
    Array.from(dataTindakLanjut.dokumenTindakLanjut).forEach(f => formData.append('dokumenTindakLanjut',f))
    formData.append('dokumenTemuanId',modelTindakLanjut.dokumenTemuanId)
    formData.append('ppkId',modelTindakLanjut.ppkId)
    formData.append('dokumenId',modelTindakLanjut.dokumenId)
    formData.append('tglTindakLanjut',modelTindakLanjut.tglTindakLanjut)
    formData.append('_tipeDokumenId',modelTindakLanjut._tipeDokumenId)
    formData.append('_noUraianTemuan',modelTindakLanjut._noUraianTemuan)
    formData.append('_uraianTemuan',modelTindakLanjut._uraianTemuan)
    formData.append('_rekomendasi',modelTindakLanjut._rekomendasi)
    formData.append('_kodeRingkasanTindakLanjut',modelTindakLanjut._kodeRingkasanTindakLanjut)
    formData.append('_ringkasanTindakLanjut',modelTindakLanjut._ringkasanTindakLanjut)
    formData.append('_subNomorRekomendasi',modelTindakLanjut._subNomorRekomendasi)
    formData.append('_statusTindakLanjut',modelTindakLanjut._statusTindakLanjut)
    formData.append('_dokumenTemuanId',modelTindakLanjut._dokumenTemuanId)
    formData.append('_nomorHeader',modelTindakLanjut._nomorHeader)
    formData.append('_titleHeader',modelTindakLanjut._titleHeader)
    formData.append('_satkerId',modelTindakLanjut._satkerId)
    formData.append('_ppkId',modelTindakLanjut._ppkId)
    formData.append('_tindakLanjut',modelTindakLanjut._tindakLanjut)
    formData.append('_kodeRekomendasi',modelTindakLanjut._kodeRekomendasi)
    console.log('createTindakLanjut | formData ====>',formData)
    return this.http.post<any>(API_URL+'/tindaklanjut/add-data', formData);
  }





  updateTindakLanjut(dataTindakLanjut:tindakLanjutStyleUpdate) {
    console.log('dataTindakLanjut createTindakLanjut ===>',dataTindakLanjut)

    var modelTindakLanjut = {
      id           : String(dataTindakLanjut.id),
      dokumenTemuanId           : String(dataTindakLanjut.dokumenTemuanId),
      ppkId                     : String(dataTindakLanjut.ppkId),
      dokumenId                 : String(dataTindakLanjut.dokumenId),
      tglTindakLanjut           : String(dataTindakLanjut.tglTindakLanjut),
      _tipeDokumenId            : String(dataTindakLanjut._tipeDokumenId),
      _noUraianTemuan           : String(dataTindakLanjut._noUraianTemuan),
      _uraianTemuan             : String(dataTindakLanjut._uraianTemuan),
      _rekomendasi              : String(dataTindakLanjut._rekomendasi),
      _kodeRekomendasi          : String(dataTindakLanjut._kodeRekomendasi),
      _kodeRingkasanTindakLanjut: String(dataTindakLanjut._kodeRingkasanTindakLanjut),
      _ringkasanTindakLanjut    : String(dataTindakLanjut._ringkasanTindakLanjut),
      _statusTindakLanjut       : String(dataTindakLanjut._statusTindakLanjut),
      _tindakLanjut             : String(dataTindakLanjut._tindakLanjut),
      _subNomorRekomendasi      : String(dataTindakLanjut._subNomorRekomendasi),
      _nomorHeader              : String(dataTindakLanjut._nomorHeader),
      _titleHeader              : String(dataTindakLanjut._titleHeader),
      _satkerId                 : String(dataTindakLanjut._satkerId),
      _ppkId                    : String(dataTindakLanjut._ppkId),
      _dokumenTemuanId          : String(dataTindakLanjut._dokumenTemuanId),
    };

    var formData = new FormData();
    Array.from(dataTindakLanjut.dokumenTindakLanjut).forEach(f => formData.append('dokumenTindakLanjut',f))
    formData.append('id',modelTindakLanjut.id)
    formData.append('dokumenTemuanId',modelTindakLanjut.dokumenTemuanId)
    formData.append('ppkId',modelTindakLanjut.ppkId)
    formData.append('dokumenId',modelTindakLanjut.dokumenId)
    formData.append('tglTindakLanjut',modelTindakLanjut.tglTindakLanjut)
    formData.append('_tipeDokumenId',modelTindakLanjut._tipeDokumenId)
    formData.append('_noUraianTemuan',modelTindakLanjut._noUraianTemuan)
    formData.append('_uraianTemuan',modelTindakLanjut._uraianTemuan)
    formData.append('_rekomendasi',modelTindakLanjut._rekomendasi)
    formData.append('_kodeRingkasanTindakLanjut',modelTindakLanjut._kodeRingkasanTindakLanjut)
    formData.append('_ringkasanTindakLanjut',modelTindakLanjut._ringkasanTindakLanjut)
    formData.append('_subNomorRekomendasi',modelTindakLanjut._subNomorRekomendasi)
    formData.append('_statusTindakLanjut',modelTindakLanjut._statusTindakLanjut)
    formData.append('_dokumenTemuanId',modelTindakLanjut._dokumenTemuanId)
    formData.append('_nomorHeader',modelTindakLanjut._nomorHeader)
    formData.append('_titleHeader',modelTindakLanjut._titleHeader)
    formData.append('_satkerId',modelTindakLanjut._satkerId)
    formData.append('_ppkId',modelTindakLanjut._ppkId)
    formData.append('_tindakLanjut',modelTindakLanjut._tindakLanjut)
    formData.append('_kodeRekomendasi',modelTindakLanjut._kodeRekomendasi)
    console.log('createTindakLanjut | formData ====>',formData)    

    return this.http.post<any>(API_URL+'/tindaklanjut/edit-data/'+modelTindakLanjut.id, formData);
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


  downloadDocument(fileName): Observable<any>{
    return this.http.get(API_URL+'/tindaklanjut/search/'+fileName, 
      {
        headers: {
          "Content-Type": "application/json",
          "Accept"      : "*/*",
        },
        responseType: "blob"
      } 
    );
  }

  searchTindakLanjut(filter): Observable<any> {
    return this.http.post(API_URL+'/tindaklanjut/search',filter);
  }


  getImage() {
    return this.http.get('https://images.unsplash.com/photo-1514328525431-eac296c01d82?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=525&q=60', {responseType: 'blob'});
  }


}
