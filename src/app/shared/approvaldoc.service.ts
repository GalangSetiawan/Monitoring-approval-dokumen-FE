import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders,HttpParams  } from '@angular/common/http';

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
      // id             : String(dataapprovaldoc.id),
      idTindakLanjut: String(dataapprovaldoc.idTindakLanjut),
      // idUser         : String(dataapprovaldoc.idUser),
      noDokumenApv   : String(dataapprovaldoc.noDokumenApv),
      tglApproval    : String(dataapprovaldoc.tglApproval),
      namaDokumenApv : String(dataapprovaldoc.namaDokumenApv),
      catatan        : String(dataapprovaldoc.catatan),
    };


    var formData = new FormData();
    Array.from(dataapprovaldoc.fileDokumen).forEach(f => formData.append('fileDokumen',f))
    // formData.append('id',modelApprovalDoc.id)
    formData.append('idTindakLanjut',modelApprovalDoc.idTindakLanjut)
    // formData.append('idUser',modelApprovalDoc.idUser)
    formData.append('noDokumenApv',modelApprovalDoc.noDokumenApv)
    formData.append('tglApproval',modelApprovalDoc.tglApproval)
    
    formData.append('namaDokumenApv',modelApprovalDoc.namaDokumenApv)
    formData.append('catatan',modelApprovalDoc.catatan)
    
  
    console.log('createApprovalDoc | formData ====>',formData)
    return this.http.post('http://127.0.0.1:8000/api/dokapproval/add-data', formData, {reportProgress: true, observe: 'events'});
  }

  updateApprovalDoc(dataapprovaldoc:approvalDocFormat): Observable<any> {
    console.log("dataapprovaldoc | updateApprovalDoc ====>",dataapprovaldoc)

    var modelApprovalDoc = {
      id             : String(dataapprovaldoc.id),
      idTindakLanjut: String(dataapprovaldoc.idTindakLanjut),
      // idUser         : String(dataapprovaldoc.idUser),
      noDokumenApv   : String(dataapprovaldoc.noDokumenApv),
      tglApproval    : String(dataapprovaldoc.tglApproval),
      namaDokumenApv : String(dataapprovaldoc.namaDokumenApv),
      catatan        : String(dataapprovaldoc.catatan),
    };


    var formData = new FormData();
    Array.from(dataapprovaldoc.fileDokumen).forEach(f => formData.append('fileDokumen',f))
    formData.append('id',modelApprovalDoc.id)
    formData.append('idTindakLanjut',modelApprovalDoc.idTindakLanjut)
    // formData.append('idUser',modelApprovalDoc.idUser)
    formData.append('tglApproval',modelApprovalDoc.tglApproval)
    formData.append('noDokumenApv',modelApprovalDoc.noDokumenApv)
    formData.append('namaDokumenApv',modelApprovalDoc.namaDokumenApv)
    formData.append('catatan',modelApprovalDoc.catatan)

    return this.http.post<any>('http://127.0.0.1:8000/api/dokapproval/edit-data/'+dataapprovaldoc.id, formData, {reportProgress: true, observe: 'events'});
  }

  getApprovalDoc(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/dokapproval/get-data');
  }

  getApprovalDocbyId(idApprovalDoc): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/dokapproval/get-data-by/'+idApprovalDoc);
  }

  deleteApprovalDoc(dataapprovaldoc): Observable<any> {
    return this.http.delete('http://127.0.0.1:8000/api/dokapproval/delete-data/'+dataapprovaldoc.id);
  }


  downloadDocument(fileName){
    return this.http.get('http://127.0.0.1:8000/api/dokapproval/search/'+fileName, {responseType: 'blob'});
  }


  getImage() {
    return this.http.get('https://images.unsplash.com/photo-1514328525431-eac296c01d82?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=525&q=60', {responseType: 'blob'});
  }
}
