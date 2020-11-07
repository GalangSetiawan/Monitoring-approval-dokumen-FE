import { Component, OnInit, } from '@angular/core';
import { SharecomponentService } from './../shared/sharecomponent.service';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-printreport',
  templateUrl: './printreport.component.html',
  styleUrls: ['./printreport.component.css']
})
export class PrintreportComponent implements OnInit {

  subscription: Subscription;
  intervalId: number;
  
  constructor(
    public shareComponentService : SharecomponentService,
    public router: Router,

    ) { }
    
    
    
  modelDokumenTemuan:any = {}
  batchDokumen = [];
  
  ngOnInit() {
    const intervalTime = interval(500); 
    this.subscription = intervalTime.subscribe(val => this.dataCetakan());
  }



  dataCetakan(){
    var data = this.shareComponentService.getDataCetakan();
    if(data != undefined || data != null ){
      this.modelDokumenTemuan = this.shareComponentService.getDataCetakan();

      if(this.modelDokumenTemuan.keadaanSdBulan != null){
        this.modelDokumenTemuan.keadaanSdBulan = this.onHalfDateChangeCetakan(this.modelDokumenTemuan.keadaanSdBulan);
      }
      this.onFullDateChangeCetakan(this.modelDokumenTemuan.tglLHA);


      this.batchDokumen = this.modelDokumenTemuan.dokumenTindakLanjut;
      // console.log('Print Report | modelDokumenTemuan ===>',this.modelDokumenTemuan)
      // console.log('Print Report | batchDokumen =========>',this.batchDokumen)
    }
    
  }


  bulan = ["kwkw","Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
  onFullDateChangeCetakan(date){
    // console.log('onFullDateChangeCetakan | date ===>',date)
    var dateString = date.split('-');
    var bulanIdx = parseInt(dateString[1])
    this.modelDokumenTemuan.displayTglTerimaDokumenTemuan =  dateString[2] + ' ' + this.bulan[bulanIdx] + ' ' + dateString[0];
  }

  onHalfDateChangeCetakan(date){
    // console.log('onHalfDateChangeCetakan | date ===>',date)
    var dateString = date.split('-');
    var bulanIdx = parseInt(dateString[1])
    this.modelDokumenTemuan.displayKeadaanSdBulan = this.bulan[bulanIdx] + ' ' + dateString[0];
  }


}
