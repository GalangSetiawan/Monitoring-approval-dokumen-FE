import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";
import * as $ from 'jquery'
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas'
import 'jspdf-autotable';
import Swal from 'sweetalert2/dist/sweetalert2.js';



import { DokumenserviceService } from './../../shared/dokumenservice.service';
import { MastersatkerService } from './../../shared/mastersatker.service';
import { MasterppkService } from './../../shared/masterppk.service';


@Component({
  selector: 'app-temuaninspektorat',
  templateUrl: './temuaninspektorat.component.html',
  styleUrls: ['./temuaninspektorat.component.css']
})
export class TemuaninspektoratComponent implements OnInit {

  constructor(
    public dokumenService     : DokumenserviceService,
    public masterPpkService   : MasterppkService,
    public masterSatkerService: MastersatkerService,



  ) { }

  ngOnInit() {
    $('#breadCrumbTitle a').text('Dokumen Temuan Inspektorat');
    this.selectActiveMenu('dokumentemuaninspektorat')
    $('#spinner').hide();
    this.getDataJenisDokumenTemuan();
    this.getDataSatker();
    this.getDataDokumenTemuan();

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


  isLoading = false;
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
    this.isiHardcode();
    

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
    this.onSatkerChange(this.dataSatker.id);
    this.modelIsiDokumen.ppkId = "";

    this.batchDokumen.push(
      {
        id                       : 999999, 
        flagId                   : 999999,
        tipeDokumenId            : 1,
        satkerId                 : this.dataSatker.id,
        statusTindakLanjut       : "Open",
        noUraianTemuan           : '1',
        kodeRekomendasi          : '3.03.07',
        subNomorRekomendasi      : 'B.',
        kodeRingkasanTindakLanjut: '06',
        uraianTemuan             : '<p>Kegiatan Verifikasi Pengaduan Tahun 2015 Tidak tertib</p>',
        rekomendasi              : '<p><span style = "font-size : 12px; font-family: Calibri, sans-serif;">Memerintahkan Tim Verifikasi Pengaduan Limbah di Jalan Raya Bojonegoro Kab. Serang (Dendy Listyawan dan Indrawan Mifta P.) untuk melengkapi laporan pelaksanaan kegiatan dengan berita acara verifikasi.</span></p>',
        ringkasanTindakLanjut    : '<p style="text-align: justify;"><strong style="font-size: 12pt;">Uji Nilai Maret 2017 (Surat No. S.141/set/KU/Set. 1/2/20017 tanggal 9 Februari 2017)</strong></p><p style="text-align: justify;"><span style="font-size: 12pt;">Belum ada perkembangan tidak lanjut</span></p><p style="text-align: justify;"><em style="color: rgb(0, 0, 0); font-size: 12pt;">Tuntas apabila dilampirkan laporan pelaksanaan kegiatan verifikasi pengaduan limbah di jalan raya Bojonegoro Kab. Serang (Dendy Listyawan dan Indrawan Mifta P.) yang telah dilengkapi berita acara verifikasi.</em></p><p style="text-align: justify;"><strong style="font-size: 12pt;">Uji Nilai Juni 2017 (Surat No. S.424/Set/KU/Set. 1/5/2017 tanggal 8 Mei 2017)</strong></p><p style="text-align: justify;"><span style="font-size: 12pt;">Belum ada perkembangan tindak lajut.</span></p><p style="text-align: justify;"><strong style="font-size: 12pt;">Uji Nilai Juli 2017.</strong></p><p style="text-align: justify;"><span style="font-size: 12pt;">Direktur Pengaduan, Pengawasan dan sanksi Administrasi Ditjen PHLHK telah memberikan teguran pembinaan kepada: </span></p><ol><li style="text-align: justify;"><span style="font-size: 12px;">Sdr. Dendy Listyawan, S.Sos selaku Pelaksana Verifikasi Pengaduan Limbah di Jl. Reya Bojonegara Kab. Serang, sesuai surat No. S. 505/PPSA/PP/GKM.0/5/2017 tanggal 5 Mei 2017 (copy terlampir)</span></li><li style="text-align: justify;"><span style="font-size: 12px;">Sdr. Indrawan Mifta Prasetyanda, S.Si selaku Pelaksana Verifikasi Pengaduan Limbah di Jl. Raya Bojonegara Kab. Serang sesuai surat No. S.506/PPSA/PP/GKM.0/5/2017 tanggal 5 Mei 2017 (copy surat terlampir).</span></li></ol><p style="text-align: justify;"><em style="color: rgb(0, 0, 0); font-size: 12pt;">Tuntas apabila dilampirkan berita acara verifikasi pada Laporan Kegiatan Verifikasi Pengaduan Limbah di Jl. Raya Bojonegara Kab. Serang.</em></p>',
        tindakLanjut             : '<p style= "text-align: justify;">Surat perjanjian kerja Jasa Konsultasi Pengadaan Barang Perlengkapan Ruang Kerja Pegawai Ditjen PHLHK (terlampir)</p><p style = "text-align: justify;">SK pemilihan jasa konsultan pengawas pada tahun 2017 (terlampir)</p><p><br></p>,',
        dokumenTemuanId          : null,
        tindakLanjutId           : null,
        responDokumenTemuanId    : null,
        titleHeader              : 'Kelemahan Aspek Pendukung',
        nomorHeader              : 'A.2.',
        ppkId                    : 1,
        responTindakLanjut       : ''
      }
    )


  }


  showBtnTambahTemuan = true;
  showBtnCancelTemuan = true;
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


  ListSatker = [];
  getDataSatker(){
    this.masterSatkerService.getSatker().subscribe(
      data => {
        console.log('Get data Satker success | getSatker ===>',data);
        this.ListSatker = data.result;
        console.log('ListSatker ===>',this.ListSatker);
      },
      error => {
        console.log('Get data Satker error   | getSatker ===>',error);
        // notify({ message: "Whoops! failed to Get data",position: {my: "center top",at: "center top"}}, "error", 3000)
        Swal.fire(
          'Whoops Failed', 
          'Tidak dapat mengambil data Satker', 
          'error'
        )
      }
    )
  }



  ListPpk = [];
  onSatkerChange(satkerid){
    console.log('onSatkerChange ====>',satkerid);
    this.modelIsiDokumen.satkerId =satkerid;

    this.masterPpkService.getPPKbyId(satkerid).subscribe(
      data => {
        console.log('Get data PPK success | getPPKbyId ===>',data);
        this.ListPpk = data.result;
        console.log('ListPpk ===>',this.ListPpk);
      },
      error => {
        console.log('Get data PPK error   | getPPKbyId ===>',error);
        // notify({ message: "Whoops! failed to Get data",position: {my: "center top",at: "center top"}}, "error", 3000)
        Swal.fire(
          'Whoops Failed', 
          'Tidak dapat mengambil data PPK', 
          'error'
        )
      }
    )
    

  }

  errorTokenHabis(){
    Swal.fire(
      'Whoops! Waktu Akses Habis', 
      'Harap Login ulang untuk melanjutkan', 
      'error'
    )
    $('#parentSignOut').click();
  }

  
  ListDokumenTemuan = [];
  dataSatker:any = {};
  getDataDokumenTemuan(){
    // var generateURL =  '?jenisDokumen='bpk/inspektorat''
    var generateURL =  '?jenisDokumen=inspektorat'
    this.dokumenService.getDokumenTemuanGridView(generateURL).subscribe(
      (data:any) =>{
        console.log('Get data getDokumenTemuan success | getDokumenTemuan ===>',data.result);
        this.ListDokumenTemuan = data.result;
        this.dataSatker = data.dataSatker;
      },
      error => {
        console.log('Get data getDokumenTemuan error   | getDokumenTemuan ===>',error.error);
        // notify({ message: "Whoops! failed to Get data",position: {my: "center top",at: "center top"}}, "error", 3000)
        if(!error.error.isAuthorized){
          this.errorTokenHabis();
        }else{
          Swal.fire(
            'Whoops Failed', 
            'Tidak dapat mengambil data Dokumen Temuan', 
            'error'
          )
        }

        
      }
    )

  }

  batchDokumen = [];
  isiHardcode(){
    this.modelDokumenTemuan = {
      isEdit                       : null,
      id                           : 2,
      jenisDokumenTemuanId         : 2,
      tglTerimaDokumenTemuan       : '2020-12-31',
      deadlineDokumenTemuan        : '2021-01-31',
      keadaanSdBulan               : '',
      forSavekeadaanSdBulan        : '2020-12-01',
      namaKegiatan                 : "Audit Pelaksanaan Tusi Tahun 2015",
      namaInstansi                 : "Ditjen Penegakan Lingkungan Hidup dan Kehutanan (PHLHK)",
      unitKerjaEselon1             : "Ditjen PHLHK",
      displayKeadaanSdBulan        : 'Desember 2020',
      displayTglTerimaDokumenTemuan: '31',
      noLHA                        : 'LHA. 26/Itjen-Ins.3/Rhs/2016',
      tglLHA                       : '2021-01-31',
      footer                       : '<p>Ini Footer</p>',
      header                       : 'MATRIK PERKEMBANGAN PELAKSANAAN TINDAK LANJUT TERHADAP LAPORAN HASIL AUDIT INSPEKTORAT JENDERAL KEMENTERIAN LINGKUNGAN HIDUP DAN KEHUTANAN',
    }

    this.batchDokumen.push(
      {
        id                       : 999999, 
        flagId                   : 999999,
        tipeDokumenId            : 1,
        satkerId                 : this.dataSatker.id,
        statusTindakLanjut       : "Open",
        noUraianTemuan           : '1',
        kodeRekomendasi          : '3.03.07',
        subNomorRekomendasi      : 'B.',
        kodeRingkasanTindakLanjut: '06',
        uraianTemuan             : '<p>Kegiatan Verifikasi Pengaduan Tahun 2015 Tidak tertib</p>',
        rekomendasi              : '<p><span style = "font-size : 12px; font-family: Calibri, sans-serif;">Memerintahkan Tim Verifikasi Pengaduan Limbah di Jalan Raya Bojonegoro Kab. Serang (Dendy Listyawan dan Indrawan Mifta P.) untuk melengkapi laporan pelaksanaan kegiatan dengan berita acara verifikasi.</span></p>',
        ringkasanTindakLanjut    : '<p style="text-align: justify;"><strong style="font-size: 12pt;">Uji Nilai Maret 2017 (Surat No. S.141/set/KU/Set. 1/2/20017 tanggal 9 Februari 2017)</strong></p><p style="text-align: justify;"><span style="font-size: 12pt;">Belum ada perkembangan tidak lanjut</span></p><p style="text-align: justify;"><em style="color: rgb(0, 0, 0); font-size: 12pt;">Tuntas apabila dilampirkan laporan pelaksanaan kegiatan verifikasi pengaduan limbah di jalan raya Bojonegoro Kab. Serang (Dendy Listyawan dan Indrawan Mifta P.) yang telah dilengkapi berita acara verifikasi.</em></p><p style="text-align: justify;"><strong style="font-size: 12pt;">Uji Nilai Juni 2017 (Surat No. S.424/Set/KU/Set. 1/5/2017 tanggal 8 Mei 2017)</strong></p><p style="text-align: justify;"><span style="font-size: 12pt;">Belum ada perkembangan tindak lajut.</span></p><p style="text-align: justify;"><strong style="font-size: 12pt;">Uji Nilai Juli 2017.</strong></p><p style="text-align: justify;"><span style="font-size: 12pt;">Direktur Pengaduan, Pengawasan dan sanksi Administrasi Ditjen PHLHK telah memberikan teguran pembinaan kepada: </span></p><ol><li style="text-align: justify;"><span style="font-size: 12px;">Sdr. Dendy Listyawan, S.Sos selaku Pelaksana Verifikasi Pengaduan Limbah di Jl. Reya Bojonegara Kab. Serang, sesuai surat No. S. 505/PPSA/PP/GKM.0/5/2017 tanggal 5 Mei 2017 (copy terlampir)</span></li><li style="text-align: justify;"><span style="font-size: 12px;">Sdr. Indrawan Mifta Prasetyanda, S.Si selaku Pelaksana Verifikasi Pengaduan Limbah di Jl. Raya Bojonegara Kab. Serang sesuai surat No. S.506/PPSA/PP/GKM.0/5/2017 tanggal 5 Mei 2017 (copy surat terlampir).</span></li></ol><p style="text-align: justify;"><em style="color: rgb(0, 0, 0); font-size: 12pt;">Tuntas apabila dilampirkan berita acara verifikasi pada Laporan Kegiatan Verifikasi Pengaduan Limbah di Jl. Raya Bojonegara Kab. Serang.</em></p>',
        tindakLanjut             : '<p style= "text-align: justify;">Surat perjanjian kerja Jasa Konsultasi Pengadaan Barang Perlengkapan Ruang Kerja Pegawai Ditjen PHLHK (terlampir)</p><p style = "text-align: justify;">SK pemilihan jasa konsultan pengawas pada tahun 2017 (terlampir)</p><p><br></p>,',
        dokumenTemuanId          : null,
        tindakLanjutId           : null,
        responDokumenTemuanId    : null,
        titleHeader              : 'Kelemahan Aspek Pendukung',
        nomorHeader              : 'A.2.',
        ppkId                    : 1,
        responTindakLanjut       : ''
      }
    )
    
  }
  


  namafile = null
  tmpFileDokumen:any
  handleFileInput(files :FileList){
    console.log('handleFileInput ===>',files)
    this.namafile = files[0].name;
    this.modelIsiDokumen.dokumenTindakLanjut = files;
    this.tmpFileDokumen = files;
    // console.log('uploadFileName ===>',this.modelApprovalDoc.fileDokumen);
  }

  
  resetFormInputFileDokumen(){
    var $el = $('#InputFileDokumen');
      $el.wrap('<form>').closest('form').get(0).reset();
      $el.unwrap();
      this.namafile = null
      this.modelIsiDokumen.dokumenTindakLanjut = null;
      this.tmpFileDokumen = null;
  }

  simpanForm(){
    this.isOpenEachFormTemuan = false;
    console.log('simpanForm ====>')
    this.closeAlldokumenForm();
  }

  onCancelFormIsiDokumen(key){
    this.isOpenEachFormTemuan = false;
    this.closeAlldokumenForm();

    console.log('onCancelFormIsiDokumen | before ===>',this.tmpValue);
    this.modelIsiDokumen[this.tmpKey] = this.tmpValue
    console.log('onCancelFormIsiDokumen | modelIsiDokumen ===>',this.tmpKey);
  }

  downloadDokumenTindakLanjut(documentName){
    console.log('downloadDokumenTindakLanjut ===>',documentName);
    this.dokumenService.downloadDocumentTindakLanjut(documentName).subscribe(
      (result:any) => {
        console.log('download dokumen sukses',result);

        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(result)
        a.href = objectUrl
        a.download = 'archive.jpg';
        a.click();
        URL.revokeObjectURL(objectUrl);



      },
      // error =>{
      //   this.isLoading = false;
      //   console.log('download dokumen Gagal',error)
      //   if(error.result !== undefined){
      //     notify({ message: "Whoops!" +error.result ,position: {my: "center top",at: "center top"}}, "error", 3000)
      //   }else{
      //     notify({ message: "Whoops! Gagal mengunduh data",position: {my: "center top",at: "center top"}}, "error", 3000)
      //   }
      // }
    );

  }

  tmpEditDdokumen = {};
  onEditTemuanClick(data){
    this.flagEdit = 1;
    console.log('onEditTemuanClick | data ====>',data);
  
    this.showBtnTambahTemuan = false;
    // this.showBtnSaveTemuan = true;
    this.showBtnCancelTemuan = true;

    this.closeAlldokumenForm();
    
    this.showFormTemuan = true;
    this.modelIsiDokumen = data;
    this.tmpEditDdokumen = data;
    console.log('onEditTemuanClick | modelIsiDokumen ====>',this.modelIsiDokumen);
  }

  batalTemuan(){
    this.showFormTemuan = false;
    this.showBtnTambahTemuan = true;
    // this.showBtnSaveTemuan = false;
    this.showBtnCancelTemuan = false;


    

    console.log('batalTemuan | modelIsiDokumen, id ===>',this.modelIsiDokumen,this.modelIsiDokumen.flagId);
    console.log('batalTemuan | batchDokumen ===>',this.batchDokumen);
    console.log('tmpEditDdokumen | batchDokumen ===>',this.tmpEditDdokumen);

    // var findID = _.findIndex(this.batchDokumen, {"flagId":this.modelIsiDokumen.flagId})
    // console.log('find ID ===>',findID)
    
    // this.batchDokumen.push(this.tmpEditDdokumen);

    for(var i in this.batchDokumen){
      // if(this.isResponseTL || this.batchDokumen[i].id != null){
      //   if(this.batchDokumen[i].id == this.modelIsiDokumen.id){
      //     console.log('batalTemuan | replaced successfully')
      //     this.batchDokumen[i] = this.tmpEditDdokumen
      //   }else{
      //     console.log('batalTemuan | replace fail')
      //   }
      // }else{
        if(this.batchDokumen[i].flagId == this.modelIsiDokumen.flagId){
          console.log('batalTemuan | replaced successfully')
          this.batchDokumen[i] = this.tmpEditDdokumen
        }else{
          console.log('batalTemuan | replace fail')
        }
      // }
    }
  

  }


  flagEdit = 0;
  saveTemuan(flagEdit){
    console.log('saveTemuan | batchDokumen=======>',this.batchDokumen)
    console.log('saveTemuan | modelIsiDokumen ===>',this.modelIsiDokumen)

    if(flagEdit == 1){ // edit Temuan
      console.log('saveTemuan | flagEdit | edit 1 ===>',flagEdit)
      for(var i in this.batchDokumen){

        if(this.windowMode == 'create'){
          if(this.modelIsiDokumen.flagId == this.batchDokumen[i].flagId){
            this.batchDokumen[i] = this.modelIsiDokumen;
          }
        }else{
          if(this.modelIsiDokumen.id == this.batchDokumen[i].id){
            this.batchDokumen[i] = this.modelIsiDokumen;
          }
        }


      }

    }else{ // tambah temuan
      console.log('saveTemuan | flagEdit | add 0 ===>',flagEdit)
      this.batchDokumen.push(this.modelIsiDokumen);
    }
    
    
    this.clearModel_isiDokumen()
    this.showFormTemuan      = false;
    // this.showBtnSaveTemuan   = false;
    this.showBtnCancelTemuan = false;
    this.showBtnTambahTemuan = true;
  }

  clearModel_isiDokumen(){
    this.modelIsiDokumen = {
      flagId                   : null,   
      id                       : null, 
      statusTindakLanjut       : "",
      noUraianTemuan           : "",
      kodeRekomendasi          : "",
      subNomorRekomendasi      : "",
      kodeRingkasanTindakLanjut: "",
      uraianTemuan             : "",
      rekomendasi              : "",
      ringkasanTindakLanjut    : "",
      tindakLanjut             : "",
      satkerId                 : null,
      ppkId                    : null,
      dokumenTemuanId          : null,
      tindakLanjutId           : null,
      responDokumenTemuanId    : null,
      titleHeader              : "",
      nomorHeader              : "",
      responTindakLanjut       : "",
      dokumenTindakLanjut      : null,
    }
  }

  onSubmit(){
    console.log('onSubmit | ModelDokumenTemuan',this.modelDokumenTemuan);
    console.log('onSubmit | windowMode',this.windowMode);
    this.modelDokumenTemuan.keadaanSdBulan = this.modelDokumenTemuan.forSavekeadaanSdBulan;

    // console.log('bacth update ===>',JSON.stringify(this.batchDokumen));

    if(this.windowMode == 'edit'){ // update temuan dan TL yg blm di tindak lanjuti
      console.log('onSubmit | update temuan dan TL yg blm di tindak lanjuti',this.windowMode);

      this.dokumenService.updateDokumenTemuan(this.modelDokumenTemuan).subscribe(
        (data:any)=>{
          console.log('updateDokumenTemuan Success ===>',data.result);
          var tmpDokTemuan = data.result;
  
  
          for(var i in this.ListDokumenTemuan){
            if(this.ListDokumenTemuan[i].id == this.modelDokumenTemuan.id){
              this.ListDokumenTemuan[i] = tmpDokTemuan;
            }
          }



          // for(var i in this.batchDokumen){
          //   this.batchDokumen[i].dokumenTemuanId = tmpDokTemuan.id;
          //   if(this.batchDokumen[i].dokumenTemuanId != null){
          //     this.batchDokumen[i].tipeDokumenId = 1;
          //   }
          // }

          var seleksiYangMauDiUpdate = [];
          for(var i in this.batchDokumen){
            if(this.batchDokumen[i].isEdit == 1 || this.batchDokumen[i].id == null ){
              seleksiYangMauDiUpdate.push(this.batchDokumen[i]);
            }
          }
  
  
          console.log('onSubmit | updateDokumen | seleksiYangMauDiUpdate ====>',seleksiYangMauDiUpdate)
          this.dokumenService.updateDokumen(seleksiYangMauDiUpdate).subscribe(
            (data:any)=>{
              console.log('updateDokumen Success ===>',data.result);   
              this.windowModeView('grid');
  
              Swal.fire(
                'Yay Success!', 
                'Dokumen Temuan berhasi disimpan', 
                'success'
              )
  
            },
            error =>{
              console.log('onSubmit | updateDokumen Gagal ===>',error);
              Swal.fire(
                'Whoops Failed!', 
                'Dokumen Temuan Tidak berhasi disimpan', 
                'error'
              )
              
            }
          )
        },
        error =>{
          console.log('onSubmit | updateDokumenTemuan Gagal ===>',error)
          Swal.fire(
            'Whoops Failed!', 
            'Dokumen Temuan Tidak berhasi disimpan', 
            'error'
          )
        }
      )
    


    }
    // else if(this.windowMode == 'edit' && this.isResponseTL){ // simpan respon Tindak lanjut
    //   console.log('onSubmit | simpan respon Tindak lanjut',this.windowMode);

    // }
    else if(this.windowMode =='create'){ // create new data
      console.log('onSubmit | create new data',this.windowMode);

      this.isLoading = true;

      this.dokumenService.createDokumenTemuan(this.modelDokumenTemuan).subscribe(
        (data:any)=>{
          console.log('createDokumenTemuan Success ===>',data.result);
          var tmpDokTemuan = data.result;
  
  
          this.ListDokumenTemuan.push(data.result);
  
   
          for(var i in this.batchDokumen){
            this.batchDokumen[i].dokumenTemuanId = tmpDokTemuan.id;
            if(this.batchDokumen[i].dokumenTemuanId != null){
              this.batchDokumen[i].tipeDokumenId = 1;
  
            }
          }
  
  
          console.log('onSubmit | createDokumen | batchDokumen ====>',this.batchDokumen)
          this.dokumenService.createDokumen(this.batchDokumen).subscribe(
            (data:any)=>{
              console.log('createDokumen Success ===>',data.result);   
              this.windowModeView('grid');
  
              this.isLoading = false;

              Swal.fire(
                'Yay Success!', 
                'Dokumen Temuan berhasi ditambahkan',   
                'success'
              )
  
            },
            error =>{
              console.log('onSubmit | createDokumen Gagal ===>',error);
              Swal.fire(
                'Whoops Failed!', 
                'Dokumen Temuan Tidak berhasi ditambahkan', 
                'error'
              )
              
            }
          )
        },
        error =>{
          console.log('onSubmit | createDokumenTemuan Gagal ===>',error)
          Swal.fire(
            'Whoops Failed!', 
            'Dokumen Temuan Tidak berhasi ditambahkan', 
            'error'
          )
        }
      )
    }


  }


  printDefault(divName){
    // $("#previewDokumen").print();


    var printContents = document.getElementById(divName).innerHTML;
  var popupWin = window.open('', '_blank', 'width=300,height=300');
  popupWin.document.open();
  popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
  popupWin.document.close();

  }

  previewDokumen(){



    console.log('previewDokumen | modelDokumenTemuan ===>',this.modelDokumenTemuan);
    console.log('previewDokumen | modelIsiDokumen ===>',this.modelIsiDokumen);
    console.log('previewDokumen | batchDokumen ===>',this.batchDokumen);
  }

  


}
