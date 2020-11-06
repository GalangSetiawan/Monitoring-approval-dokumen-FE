import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class SharecomponentService {

  constructor() { }

  dataCetakan:any;
  sendDataCetakan(data) {
    this.dataCetakan = data
    // console.log('SharecomponentService | sendDataCetakan ===>',this.dataCetakan)
  }
  getDataCetakan(){
    // console.log('SharecomponentService | getDataCetakan ===>',this.dataCetakan)
    return this.dataCetakan;
  }


  dataUser:any
  sendDataUserLogin(data){
    this.dataUser = data;
  }

  getDataUserLogin(){
    return this.dataUser;
  }



}
