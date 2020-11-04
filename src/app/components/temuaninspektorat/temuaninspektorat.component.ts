import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";
import * as $ from 'jquery'
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas'
import 'jspdf-autotable';
import Swal from 'sweetalert2/dist/sweetalert2.js';



import { DokumenserviceService } from './../../shared/dokumenservice.service';


@Component({
  selector: 'app-temuaninspektorat',
  templateUrl: './temuaninspektorat.component.html',
  styleUrls: ['./temuaninspektorat.component.css']
})
export class TemuaninspektoratComponent implements OnInit {

  constructor(
    public dokumenService     : DokumenserviceService,

  ) { }

  ngOnInit() {
    $('#breadCrumbTitle a').text('Dokumen Temuan Inspektorat');
    this.selectActiveMenu('dokumentemuaninspektorat')
    $('#spinner').hide();
    this.getDataJenisDokumenTemuan();

  }

  selectActiveMenu(opened){
    this.removeActiveMenu();
    if(opened == 'dashboard'){
      $('#listMenu #dashboard').addClass('uk-active');
    }else if(opened == 'blog'){
      $('#listMenu #blog').addClass('uk-active');
    }else if(opened == 'dokumenTemuan'){
      $('#listMenu #dokumenTemuan').addClass('uk-active');
    }else if(opened == 'dokumentemuaninspektorat'){
      $('#listMenu #dokumentemuaninspektorat').addClass('uk-active');
    }else if(opened == 'tindaklanjutv2'){
      $('#listMenu #tindaklanjutv2').addClass('uk-active');
    }else if(opened == 'tindaklanjut'){
      $('#listMenu #tindaklanjut').addClass('uk-active');
    }else if(opened == 'approvaldoc'){
      $('#listMenu #approvaldoc').addClass('uk-active');
    }else if(opened == 'masterkpa'){
      $('#listMenu #masterkpa').addClass('uk-active');
    }else if(opened == 'masterppk'){
      $('#listMenu #masterppk').addClass('uk-active');
    }else if(opened == 'cabang'){
      $('#listMenu #cabang').addClass('uk-active');
    }else if(opened == 'satker'){
      $('#listMenu #satker').addClass('uk-active');
    }else if(opened == 'register'){
      $('#listMenu #register').addClass('uk-active');
    }else if(opened == 'login'){
      $('#listMenu #login').addClass('uk-active');
    }else if(opened == 'profile'){
      $('#listMenu #profile').addClass('uk-active');
    }else if(opened == 'register'){
      $('#listMenu #register').addClass('uk-active');
    }
  }


  removeActiveMenu(){
    $('#listMenu #dashboard').removeClass('uk-active');
    $('#listMenu #dokumenTemuan').removeClass('uk-active');
    $('#listMenu #dokumentemuaninspektorat').removeClass('uk-active');
    $('#listMenu #tindaklanjutv2').removeClass('uk-active');
    $('#listMenu #tindaklanjut').removeClass('uk-active');
    $('#listMenu #approvaldoc').removeClass('uk-active');
    $('#listMenu #masterppk').removeClass('uk-active');
    $('#listMenu #cabang').removeClass('uk-active');
    $('#listMenu #blog').removeClass('uk-active');
    $('#listMenu #satker').removeClass('uk-active');
    $('#listMenu #register').removeClass('uk-active');
    $('#listMenu #login').removeClass('uk-active');
    $('#listMenu #profile').removeClass('uk-active');
    $('#listMenu #register').removeClass('uk-active');
  }



  windowMode = "grid"; // create|grid|edit|view
  windowModeView(mode){
    this.windowMode = mode;

    if(this.windowMode == 'create'){
      $('.uk-breadcrumb').append('<li class="uk-disabled" id="create"><a>Buat</a></li>');
      $('.uk-breadcrumb #edit').remove();

      this.onbeforeNew();
     
    }else if (this.windowMode == 'edit'){
      $('.uk-breadcrumb').append('<li class="uk-disabled" id="edit"><a>Edit</a></li>')
      $('.uk-breadcrumb #create').remove();
    }else if(this.windowMode == 'grid'){
      $('.uk-breadcrumb #edit').remove();
      $('.uk-breadcrumb #create').remove();
    }
  }


  cleanBlankKey(obj){
    for (var propName in obj) { 
      if (obj[propName] == null || obj[propName] == undefined || obj[propName] == "" ) {
        delete obj[propName];
      }
    }
    return obj;
  }


  onbeforeNew(){
    this.modelDokumenTemuan.jenisDokumenTemuanId =  2
    this.progressStatus(1);
  }

  filterData = {noLHA:"", jenisDokumenTemuanId:null, tglLHA:null, namaKegiatan:""};
  doSearch(filter){
    this.filterData = filter; 
    console.log('doSearch ===>',this.filterData);

    this.filterData = this.cleanBlankKey(this.filterData);

    this.dokumenService.searchDokumenTemuan(this.filterData).subscribe(
      data => {
        console.log('searchPPK PPK success | searchPPK ===>',data);
      },
      error => {
        console.log('searchPPK PPK error   | searchPPK ===>',error);
      }
    )
  }

  doReset(){
    console.log('this.filterData ===>',this.filterData)
    this.filterData = {noLHA:"", jenisDokumenTemuanId:null, tglLHA:null, namaKegiatan:""};
  }

  isProgress = 1;
  showBtnSimpan = false;
  progressStatus(step){
    this.isProgress = step;



    if(step == 1){
      $('#step1').addClass('is-active');
      this.showBtnSimpan = false;
    }else if(step == 2){
      this.showBtnSimpan = false;
      $('#step1').addClass('is-complete');
      $('#step2').addClass('is-active');
    }else if(step == 3){
      this.showBtnSimpan = true;
      
      $('#step1').addClass('is-complete');
      $('#step2').addClass('is-complete');
      $('#step3').addClass('is-active');
    }
  }

  // ======================= TABLE GRID =========================-
  contentReady(e) {
    if (!e.component.getSelectedRowKeys().length)
        e.component.selectRowsByIndexes(0);
    }
    selectionChanged(e) {
      console.log('selectionChanged selectedRowsData ===>',e.selectedRowsData[0])
      console.log('selectionChanged event ===>',e)
        e.component.collapseAll(-1);
        e.component.expandRow(e.currentSelectedRowKeys[0]);
  
        // if(this.ListDokumenTemuan.length > 0){
        //   if(e.selectedRowsData[0] == undefined){
        //     e.selectedRowsData[0] = this.ListDokumenTemuan[0]
        //   }
    
        //   this.dokumenService.getDetailDokumenTemuanGridView(e.selectedRowsData[0].id).subscribe(
        //     data => {
        //       console.log('selectionChanged Detail success ===>',data);  
        //       e.selectedRowsData[0].dataTindakLanjut = data.result.resultDokumen;
        //     },
        //     error => {
        //       console.log('selectionChanged Detail error ===>',error);
        //     }
        //   )
        // }
  
    }
  // ======================= TABLE GRID ==========================


  keteranganDokumenId = 0;
  onKeteranganDokumenChange(id){
    console.log('onKeteranganDokumenChange | keteranganDokumenId ====>',this.keteranganDokumenId);
     this.keteranganDokumenId = id;
  }


  modelDokumenTemuan: any = {};
  modelIsiDokumen   : any = {};

  progres1Validation = false;
  progres1ValidationFunction(){
    if(
      (this.modelDokumenTemuan.jenisDokumenTemuanId == null || this.modelDokumenTemuan.jenisDokumenTemuanId == "" ) ||
      (this.modelDokumenTemuan.tglTerimaDokumenTemuan == null || this.modelDokumenTemuan.tglTerimaDokumenTemuan == "" ) ||
      (this.modelDokumenTemuan.deadlineDokumenTemuan == null || this.modelDokumenTemuan.deadlineDokumenTemuan == "" ) ||
      (this.keteranganDokumenId == 2 && (this.modelDokumenTemuan.keadaanSdBulan == null || this.modelDokumenTemuan.keadaanSdBulan == "" )) ||
      (this.modelDokumenTemuan.namaKegiatan == null || this.modelDokumenTemuan.namaKegiatan == "" ) ||
      (this.modelDokumenTemuan.namaInstansi == null || this.modelDokumenTemuan.namaInstansi == "" ) ||
      (this.modelDokumenTemuan.unitKerjaEselon1 == null || this.modelDokumenTemuan.unitKerjaEselon1 == "" ) ||
      (this.modelDokumenTemuan.noLHA == null || this.modelDokumenTemuan.noLHA == "" ) ||
      (this.modelDokumenTemuan.tglLHA == null || this.modelDokumenTemuan.tglLHA == "" ) ||
      (this.modelDokumenTemuan.header == null || this.modelDokumenTemuan.header == "" )
    ){
      this.progres1Validation = false;
    }else{
      this.progres1Validation = true;
    }
  }

  ListJenisDokumenTemuan = [];
  getDataJenisDokumenTemuan(){
    this.dokumenService.getJenisDokumenTemuan().subscribe(
      (data:any) =>{
        console.log('Get data getJenisDokumenTemuan success | getJenisDokumenTemuan ===>',data.result);
        this.ListJenisDokumenTemuan = data.result;
      },
      error => {
        console.log('Get data getJenisDokumenTemuan error   | getJenisDokumenTemuan ===>',error);
        // notify({ message: "Whoops! failed to Get data",position: {my: "center top",at: "center top"}}, "error", 3000)
        Swal.fire(
          'Whoops Failed', 
          'Tidak dapat mengambil data Jenis Dokumen Temuan', 
          'error'
        )
      }
    )

  }


  bulan = ["kwkw","Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];

  onFullDateChange(date){
    var dateString = date.split('-');
    var bulanIdx = parseInt(dateString[1])
    this.modelDokumenTemuan.displayTglTerimaDokumenTemuan =  dateString[2] + ' ' + this.bulan[bulanIdx] + ' ' + dateString[0];
    var result = dateString[2] + ' ' + this.bulan[bulanIdx] + ' ' + dateString[0];
    return result;
  }

  onHalfDateChange(date){

    console.log('onHalfDateChange | date ===>',date)
    var dateString = date.split('-');
    var bulanIdx = parseInt(dateString[1])
    this.modelDokumenTemuan.displayKeadaanSdBulan = this.bulan[bulanIdx] + ' ' + dateString[0];


    if(this.windowMode == 'create'){
      this.modelDokumenTemuan.forSavekeadaanSdBulan = date+'-01';
      this.modelDokumenTemuan.keadaanSdBulan = date;
    }else{
      this.modelDokumenTemuan.forSavekeadaanSdBulan = date
      this.modelDokumenTemuan.keadaanSdBulan = dateString[0]+"-"+dateString[1];
    }

    return this.modelDokumenTemuan.keadaanSdBulan;

  }

  fullDateToHalfDate(date){
    console.log('fullDateToHalfDate | date ===>',date);
    var splitDate = date.split('-');
    var result = splitDate[0]+'-'+splitDate[1];
    console.log('fullDateToHalfDate | result ===>',result)
  }



  closeAlldokumenForm(){
    this.is_noUraianTemuan            = false;
    this.is_kodeRekomendasi           = false;
    this.is_subNomorRekomendasi       = false;
    this.is_kodeRingkasanTindakLanjut = false;
    this.is_statusTindakLanjut        = false;
    this.is_uraianTemuan              = false;
    this.is_rekomendasi               = false;
    this.is_tindakLanjut              = false;
    this.is_ringkasanTindakLanjut     = false;   
    this.is_nomorHeader               = false;
    this.is_titleHeader               = false; 
    this.is_responTindakLanjut        = false;
  }

  is_noUraianTemuan            = false;
  is_kodeRekomendasi           = false;
  is_subNomorRekomendasi       = false;
  is_kodeRingkasanTindakLanjut = false;
  is_statusTindakLanjut        = false;
  is_uraianTemuan              = false;
  is_rekomendasi               = false;
  is_tindakLanjut              = false;
  is_ringkasanTindakLanjut     = false;
  is_nomorHeader               = false;
  is_titleHeader               = false;
  is_responTindakLanjut        = false;
  lightInputDokumenTitle       = "";
  tmpValue = "";
  tmpKey = ""
  isOpenEachFormTemuan = false;
  modalLightInput(title,key){
    console.log('modalLightInput ===>',title,key);
    this.lightInputDokumenTitle = title;
    this.tmpKey = key
    this.isOpenEachFormTemuan = true;
    if(key == 'noUraianTemuan' ){
      this.tmpValue = this.modelIsiDokumen.noUraianTemuan;
      this.closeAlldokumenForm();
      this.is_noUraianTemuan = true;
    }else if(key == 'kodeRekomendasi'){
      this.tmpValue = this.modelIsiDokumen.kodeRekomendasi;
      this.closeAlldokumenForm();
      this.is_kodeRekomendasi = true;
    }else if(key == 'subNomorRekomendasi'){
      this.tmpValue = this.modelIsiDokumen.subNomorRekomendasi;
      this.closeAlldokumenForm();
      this.is_subNomorRekomendasi = true;
    }else if(key == 'kodeRingkasanTindakLanjut'){
      this.tmpValue = this.modelIsiDokumen.kodeRingkasanTindakLanjut;
      this.closeAlldokumenForm();
      this.is_kodeRingkasanTindakLanjut = true;
    }else if(key == 'statusTindakLanjut'){
      this.tmpValue = this.modelIsiDokumen.statusTindakLanjut;
      this.closeAlldokumenForm();
      this.is_statusTindakLanjut = true;
    }else if(key == 'uraianTemuan'){ 
      this.tmpValue = this.modelIsiDokumen.uraianTemuan;
      this.closeAlldokumenForm();
      this.is_uraianTemuan = true;
    }else if(key == 'rekomendasi'){
      this.tmpValue = this.modelIsiDokumen.rekomendasi;
      this.closeAlldokumenForm();
      this.is_rekomendasi = true;
    }else if(key == 'tindakLanjut'){
      this.tmpValue = this.modelIsiDokumen.tindakLanjut;
      this.closeAlldokumenForm();
      this.is_tindakLanjut = true;
    }else if(key == 'ringkasanTindakLanjut'){
      this.tmpValue = this.modelIsiDokumen.ringkasanTindakLanjut;
      this.closeAlldokumenForm();
      this.is_ringkasanTindakLanjut = true;
    }else if(key == 'nomorHeader'){
      this.tmpValue = this.modelIsiDokumen.nomorHeader;
      this.closeAlldokumenForm();
      this.is_nomorHeader = true;
    }else if(key == 'titleHeader'){
      this.tmpValue = this.modelIsiDokumen.titleHeader;
      this.closeAlldokumenForm();
      this.is_titleHeader = true;
    }else if(key == 'responTindakLanjut'){
      this.tmpValue = this.modelIsiDokumen.responTindakLanjut;
      this.closeAlldokumenForm();
      this.is_responTindakLanjut = true;
    }
  }

  disabledSimpanTemuan = false;
  validasiBtnSimpanTemuan(){
    if(this.modelIsiDokumen.id == null || (this.modelIsiDokumen.id != null )){ //add new || edit dokumen yg blm di tindak lanjutin
      console.log('modalLightInput | add new || edit dokumen yg blm di tindak lanjutin ')
      if(
        this.modelIsiDokumen.nomorHeader               == "" ||
        this.modelIsiDokumen.titleHeader               == "" ||
        this.modelIsiDokumen.noUraianTemuan            == "" || 
        this.modelIsiDokumen.uraianTemuan              == "" ||
        this.modelIsiDokumen.kodeRekomendasi           == "" ||
        this.modelIsiDokumen.rekomendasi               == "" ||
        this.modelIsiDokumen.kodeRingkasanTindakLanjut == "" ||
        this.modelIsiDokumen.ringkasanTindakLanjut     == ""
      ){
        this.disabledSimpanTemuan = true;
      }else{
        this.disabledSimpanTemuan = false;
      }

      console.log('validasi 1 | nomorHeader ================>',this.modelIsiDokumen.nomorHeader)
      console.log('validasi 1 | titleHeader ================>',this.modelIsiDokumen.titleHeader)
      console.log('validasi 1 | noUraianTemuan =============>',this.modelIsiDokumen.noUraianTemuan)
      console.log('validasi 1 | uraianTemuan ===============>',this.modelIsiDokumen.uraianTemuan)
      console.log('validasi 1 | kodeRekomendasi ============>',this.modelIsiDokumen.kodeRekomendasi)
      console.log('validasi 1 | rekomendasi ================>',this.modelIsiDokumen.rekomendasi)
      console.log('validasi 1 | kodeRingkasanTindakLanjut ==>',this.modelIsiDokumen.kodeRingkasanTindakLanjut)
      console.log('validasi 1 | ringkasanTindakLanjut ======>',this.modelIsiDokumen.ringkasanTindakLanjut)

    }
  }

  btnTambahTemuan(){
    this.modelIsiDokumen.satkerId = "";
    this.modelIsiDokumen.ppkId = ""
  }


  showBtnTambahTemuan = true;
  showBtnCancelTemuan = false;
  showFormTemuan = false;
  addTemuan(satkerId,ppkId){
    this.showFormTemuan = true;
    // this.showBtnSaveTemuan = true;
    this.showBtnCancelTemuan = true;
    this.showBtnTambahTemuan = false;
    this.closeAlldokumenForm();
    this.modelIsiDokumen.flagId = new Date().getTime(),      
    this.modelIsiDokumen.satkerId = satkerId,   
    this.modelIsiDokumen.ppkId = ppkId  
    this.validasiBtnSimpanTemuan();
    console.log('addTemuan | newModel ===>',this.modelIsiDokumen);
  }


}
