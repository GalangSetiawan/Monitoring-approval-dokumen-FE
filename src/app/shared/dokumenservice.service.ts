import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const API_URL = "http://127.0.0.1:8000/api";

export class dokumenTemuanStyle{
  dokumenTemuanId          : Number ;                                         
  dokumenTindakLanjut      : FileList;                                      
  flagId                   : Number;                              
  id                       : Number;                              
  kodeRekomendasi          : String;                                    
  kodeRingkasanTindakLanjut: String;                     
  noUraianTemuan           : String;              
  nomorHeader              : String;      
  ppkId                    : Number;                                 
  rekomendasi              : String;                    
  responDokumenTemuanId    : Number;                                         
  responTindakLanjut       : String;                         
  ringkasanTindakLanjut    : String;                               
  satkerId                 : Number;                                 
  statusTindakLanjut       : String;                                   
  subNomorRekomendasi      : String;                                      
  tindakLanjut             : String;                                 
  tindakLanjutId           : Number;                                        
  tipeDokumenId            : Number;                                       
  titleHeader              : String;                                    
  uraianTemuan             : String;
}



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



  getDokumenTemuanGridView(jenisDokumen): Observable<any> {
    return this.http.get(API_URL+'/dokumentemuan/grid-view'+jenisDokumen);
  }

  getDetailDokumenTemuanGridView(id): Observable<any> {
    return this.http.get(API_URL+'/dokumentemuan/get-detail-parent-grid/'+id);//parent
  }


  
  getDetailTindaKlanjutByID(id){
    return this.http.get(API_URL+'/dokumentemuan/get-detail-tindaklanjut/'+id);
  }

  saveResponTindakLanjut(data){
    return this.http.post(API_URL+'/tindaklanjut/add-data-respon/'+data.tindakLanjutId, data);
  }

  getDataGeneratePDF(id): Observable<any>{
    return this.http.get(API_URL+'/dokumentemuan/get-preview-dokumen/'+id);
  }



  
  downloadDocumentTindakLanjut(fileName){
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


    getDataGridById(id){
      return this.http.get(API_URL+'/tindaklanjut/get-data-grid/'+id);
    }



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
      console.log('factory create dokumen ===>',dataDokumen)

      

      var formData = new FormData();

        var modelTindakLanjut = {
          dokumenTemuanId          : String(dataDokumen[0].dokumenTemuanId),                                     
          // id                       : String(dataDokumen[0].id),                              
          kodeRekomendasi          : String(dataDokumen[0].kodeRekomendasi),                                    
          kodeRingkasanTindakLanjut: String(dataDokumen[0].kodeRingkasanTindakLanjut),                     
          noUraianTemuan           : String(dataDokumen[0].noUraianTemuan),              
          nomorHeader              : String(dataDokumen[0].nomorHeader),      
          ppkId                    : String(dataDokumen[0].ppkId),                                 
          rekomendasi              : String(dataDokumen[0].rekomendasi),                    
          // responDokumenTemuanId    : String(dataDokumen[0].responDokumenTemuanId),                                         
          // responTindakLanjut       : String(dataDokumen[0].responTindakLanjut),                         
          ringkasanTindakLanjut    : String(dataDokumen[0].ringkasanTindakLanjut),                               
          satkerId                 : String(dataDokumen[0].satkerId),                                 
          statusTindakLanjut       : String(dataDokumen[0].statusTindakLanjut),                                   
          // subNomorRekomendasi      : String(dataDokumen[0].subNomorRekomendasi),                                      
          tindakLanjut             : String(dataDokumen[0].tindakLanjut),                                 
          // tindakLanjutId           : String(dataDokumen[0].tindakLanjutId),                                        
          tipeDokumenId            : String(dataDokumen[0].tipeDokumenId),                                       
          titleHeader              : String(dataDokumen[0].titleHeader),                                    
          uraianTemuan             : String(dataDokumen[0].uraianTemuan),
        }
  
        var dokumenTindakLanjut : FileList;
        dokumenTindakLanjut = dataDokumen[0].dokumenTindakLanjut
        Array.from(dokumenTindakLanjut).forEach(f => formData.append('dokumenTindakLanjut',f))
        formData.append('dokumenTemuanId',modelTindakLanjut.dokumenTemuanId)
        formData.append('kodeRekomendasi',modelTindakLanjut.kodeRekomendasi)
        formData.append('kodeRingkasanTindakLanjut',modelTindakLanjut.kodeRingkasanTindakLanjut)
        formData.append('noUraianTemuan',modelTindakLanjut.noUraianTemuan)
        formData.append('nomorHeader',modelTindakLanjut.nomorHeader)
        formData.append('ppkId',modelTindakLanjut.ppkId)
        formData.append('rekomendasi',modelTindakLanjut.rekomendasi)
        formData.append('ringkasanTindakLanjut',modelTindakLanjut.ringkasanTindakLanjut)
        formData.append('satkerId',modelTindakLanjut.satkerId)
        formData.append('statusTindakLanjut',modelTindakLanjut.statusTindakLanjut)
        formData.append('tindakLanjut',modelTindakLanjut.tindakLanjut)
        formData.append('tipeDokumenId',modelTindakLanjut.tipeDokumenId)
        formData.append('titleHeader',modelTindakLanjut.titleHeader)
        formData.append('uraianTemuan',modelTindakLanjut.uraianTemuan)
  
      
      console.log('createDokumen | final ====>',formData)


      return this.http.post(API_URL+'/dokumen/add-data',formData );
    }
  
    updateDokumen(dataDokumen): Observable<any> {
      return this.http.post<any>(API_URL+'/dokumen/edit-data/', dataDokumen);
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




                                     