import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders,HttpParams  } from '@angular/common/http';


const API_URL = "http://127.0.0.1:8000/api";

export class approvalDocFormat {
  id             : Number
  idTindakLanjut : Number
  idUser         : Number
  noDokumenApv   : String
  tglApproval    : String
  fileDokumen    : FileList; 
  namaDokumenApv : String
  catatan        : String
  } 

@Injectable({
  providedIn: 'root'
})
export class ApprovaldocService {

  constructor(private http: HttpClient) { }


  createApprovalDoc(dataapprovaldoc:approvalDocFormat): Observable<any> {
    var modelApprovalDoc = {
      idTindakLanjut: String(dataapprovaldoc.idTindakLanjut),
      noDokumenApv   : String(dataapprovaldoc.noDokumenApv),
      tglApproval    : String(dataapprovaldoc.tglApproval),
      namaDokumenApv : String(dataapprovaldoc.namaDokumenApv),
      catatan        : String(dataapprovaldoc.catatan),
    };


    var formData = new FormData();
    Array.from(dataapprovaldoc.fileDokumen).forEach(f => formData.append('fileDokumen',f))
    formData.append('idTindakLanjut',modelApprovalDoc.idTindakLanjut)
    formData.append('noDokumenApv',modelApprovalDoc.noDokumenApv)
    formData.append('tglApproval',modelApprovalDoc.tglApproval)
    formData.append('namaDokumenApv',modelApprovalDoc.namaDokumenApv)
    formData.append('catatan',modelApprovalDoc.catatan)
    
  
    console.log('createApprovalDoc | formData ====>',formData)
    return this.http.post(API_URL+'/dokapproval/add-data', formData, {reportProgress: true, observe: 'events'});
  }

  updateApprovalDoc(dataapprovaldoc:approvalDocFormat): Observable<any> {
    console.log("dataapprovaldoc | updateApprovalDoc ====>",dataapprovaldoc)

    var modelApprovalDoc = {
      id             : String(dataapprovaldoc.id),
      idTindakLanjut: String(dataapprovaldoc.idTindakLanjut),
      noDokumenApv   : String(dataapprovaldoc.noDokumenApv),
      tglApproval    : String(dataapprovaldoc.tglApproval),
      namaDokumenApv : String(dataapprovaldoc.namaDokumenApv),
      catatan        : String(dataapprovaldoc.catatan),
    };


    var formData = new FormData();
    if(dataapprovaldoc.fileDokumen != null){
      Array.from(dataapprovaldoc.fileDokumen).forEach(f => formData.append('fileDokumen',f))
    }else{
      formData.append('fileDokumen',null)
    }
    formData.append('id',modelApprovalDoc.id)
    formData.append('idTindakLanjut',modelApprovalDoc.idTindakLanjut)
    formData.append('tglApproval',modelApprovalDoc.tglApproval)
    formData.append('noDokumenApv',modelApprovalDoc.noDokumenApv)
    formData.append('namaDokumenApv',modelApprovalDoc.namaDokumenApv)
    formData.append('catatan',modelApprovalDoc.catatan)

    return this.http.post<any>(API_URL+'/dokapproval/edit-data/'+dataapprovaldoc.id, formData, {reportProgress: true, observe: 'events'});
  }

  getApprovalDoc(): Observable<any> {
    return this.http.get(API_URL+'/dokapproval/get-data');
  }

  getApprovalDocbyId(idApprovalDoc): Observable<any> {
    return this.http.get(API_URL+'/dokapproval/get-data-by/'+idApprovalDoc);
  }

  deleteApprovalDoc(dataapprovaldoc): Observable<any> {
    return this.http.delete(API_URL+'/dokapproval/delete-data/'+dataapprovaldoc.id);
  }


  downloadDocument(fileName){
    return this.http.get(API_URL+'/dokapproval/search/'+fileName, {responseType: 'blob'});
  }


  getImage() {
    return this.http.get('https://images.unsplash.com/photo-1514328525431-eac296c01d82?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=525&q=60', {responseType: 'blob'});
  }
}
