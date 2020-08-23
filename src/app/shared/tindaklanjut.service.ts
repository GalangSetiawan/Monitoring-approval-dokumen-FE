import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders,HttpParams  } from '@angular/common/http';



const API_URL = "http://127.0.0.1:8000/api";



export class tindakLanjutStyle {
  id         : Number;
  noDokumen  : String; 
  namaDokumen: String;
  fileDokumen: FileList; 
  tglDariBpk : String; 
  tglKePpk   : String; 
  idKpa      : Number;  
  idPpk      : Number;
  status     : String; 
  idUser     : Number;
  catatan    : String;
  } 



@Injectable({
  providedIn: 'root'
})
export class TindaklanjutService {

  constructor(private http: HttpClient) { }


  createTindakLanjut(dataTindakLanjut:tindakLanjutStyle): Observable<any> {
    console.log('dataTindakLanjut createTindakLanjut ===>',dataTindakLanjut)

    var modelTindakLanjut = {
      // id         : String(dataTindakLanjut.id),
      noDokumen  : String(dataTindakLanjut.noDokumen),
      namaDokumen: String(dataTindakLanjut.namaDokumen),
      tglDariBpk : String(dataTindakLanjut.tglDariBpk),
      tglKePpk   : String(dataTindakLanjut.tglKePpk),
      idKpa      : String(dataTindakLanjut.idKpa),
      idPpk      : String(dataTindakLanjut.idPpk),
      status     : String(dataTindakLanjut.status),
      idUser     : String(dataTindakLanjut.idUser),
      catatan    : String(dataTindakLanjut.catatan),
    };


    var formData = new FormData();
    Array.from(dataTindakLanjut.fileDokumen).forEach(f => formData.append('fileDokumen',f))
    formData.append('noDokumen',modelTindakLanjut.noDokumen)
    formData.append('namaDokumen',modelTindakLanjut.namaDokumen)
    formData.append('tglDariBpk',modelTindakLanjut.tglDariBpk)
    formData.append('tglKePpk',modelTindakLanjut.tglKePpk)
    formData.append('idKpa',modelTindakLanjut.idKpa)
    formData.append('idPpk',modelTindakLanjut.idPpk)
    formData.append('status',modelTindakLanjut.status)
    formData.append('idUser',modelTindakLanjut.idUser)
    formData.append('catatan',modelTindakLanjut.catatan)
    
  
    console.log('createTindakLanjut | formData ====>',formData)
    return this.http.post(API_URL+'/tindaklanjut/add-data', formData, {reportProgress: true, observe: 'events'});
  }

  updateTindakLanjut(dataTindakLanjut:tindakLanjutStyle): Observable<any> {
    console.log("dataTindakLanjut | updateTindakLanjut ====>",dataTindakLanjut)

    var modelTindakLanjut = {
      // id         : String(dataTindakLanjut.id),
      noDokumen  : String(dataTindakLanjut.noDokumen),
      namaDokumen: String(dataTindakLanjut.namaDokumen),
      tglDariBpk : String(dataTindakLanjut.tglDariBpk),
      tglKePpk   : String(dataTindakLanjut.tglKePpk),
      idKpa      : String(dataTindakLanjut.idKpa),
      idPpk      : String(dataTindakLanjut.idPpk),
      idUser     : String(dataTindakLanjut.idUser),
      catatan    : String(dataTindakLanjut.catatan),
      status     : String(dataTindakLanjut.status),
    };


    var formData = new FormData();
    if(dataTindakLanjut.fileDokumen != null){
      Array.from(dataTindakLanjut.fileDokumen).forEach(f => formData.append('fileDokumen',f))
    }else{
      formData.append('fileDokumen',null)
    }
    formData.append('noDokumen',modelTindakLanjut.noDokumen)
    formData.append('namaDokumen',modelTindakLanjut.namaDokumen)
    formData.append('tglDariBpk',modelTindakLanjut.tglDariBpk)
    formData.append('tglKePpk',modelTindakLanjut.tglKePpk)
    formData.append('idKpa',modelTindakLanjut.idKpa)
    formData.append('idPpk',modelTindakLanjut.idPpk)
    formData.append('status',modelTindakLanjut.status)
    formData.append('idUser',modelTindakLanjut.idUser)
    formData.append('catatan',modelTindakLanjut.catatan)

    return this.http.post<any>(API_URL+'/tindaklanjut/edit-data/'+dataTindakLanjut.id, formData, {reportProgress: true, observe: 'events'});
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
