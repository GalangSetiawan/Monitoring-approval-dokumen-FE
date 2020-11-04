import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TokenService } from '../../shared/token.service';
import { AuthStateService } from '../../shared/auth-state.service';
import { DokumenserviceService } from './../../shared/dokumenservice.service';
import { MastersatkerService } from './../../shared/mastersatker.service';
import { MasterppkService } from './../../shared/masterppk.service';
import { Router } from '@angular/router';

declare var UIkit: any;



import * as _ from "lodash";
import * as $ from 'jquery'
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas'
import 'jspdf-autotable';
import * as html2pdf from 'html2pdf.js'

import Swal from 'sweetalert2/dist/sweetalert2.js';
import notify from 'devextreme/ui/notify';

import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-temuanbpk',
  templateUrl: './temuanbpk.component.html',
  styleUrls: ['./temuanbpk.component.css']
})
export class TemuanbpkComponent implements OnInit {

  dokumenTemuanForm: FormGroup;
  isLoading = false;
  jenisDokumenTemuanId:any
  public titleHeader = "Master DokumenTemuan";

  constructor(
    public masterSatkerService: MastersatkerService,
    public dokumenService     : DokumenserviceService,
    public masterPpkService   : MasterppkService,
    private route             : Router, 
    private token             : TokenService,
    public fb                 : FormBuilder,
    private authState         : AuthStateService,
    private activateRoute     : ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.activateRoute.queryParams.subscribe(
      params => {
        this.jenisDokumenTemuanId = parseInt(params['jenisDokumenTemuanId'])
        console.log('Dokumen Temuan id ====>',this.jenisDokumenTemuanId);

        if(this.jenisDokumenTemuanId == 1){
          this.windowModeView('grid')
          $('#breadCrumbTitle a').text('Dokumen Temuan BPK');
        }else if(this.jenisDokumenTemuanId == 2){
          this.windowModeView('grid')
          $('#breadCrumbTitle a').text('Dokumen Temuan Inspektorat');
        }
      }
    )


    this.getDataJenisDokumenTemuan();
    this.getDataSatker();
    this.getDataDokumenTemuan();
   
    this.selectActiveMenu('dokumenTemuan')
    $('#spinner').hide();
  }

  selectActiveMenu(opened){
    this.removeActiveMenu();
    if(opened == 'dashboard'){
      $('#listMenu #dashboard').addClass('uk-active');
    }else if(opened == 'blog'){
      $('#listMenu #blog').addClass('uk-active');
    }else if(opened == 'dokumenTemuan'){
      $('#listMenu #dokumenTemuan').addClass('uk-active');
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

  
  footerTemplate = '<p><span style="font-size: 12pt;">Jakarta, September 2017</span></p><p><span style="font-size: 12pt;"> Kepala Bagian Keuangan dan Umum</span></p><p><br></p><p><br></p><p><strong style="font-size: 12pt;"><u>S u w a r t i, S H</u></strong></p><p><span style="font-size: 12pt;">NIP 19671014 199303 2 001</span></p>'

  bulan = ["kwkw","Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
  

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



  keteranganDokumenId = 0;
  onKeteranganDokumenChange(id){
    console.log('onKeteranganDokumenChange | keteranganDokumenId ====>',this.keteranganDokumenId);
     this.keteranganDokumenId = id;
  }
  

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
        satkerId                 : 1,
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


  

  

  modelDokumenTemuan = {
    id                            : null,
    jenisDokumenTemuanId          : null,
    tglTerimaDokumenTemuan        : null,
    deadlineDokumenTemuan         : null,
    keadaanSdBulan                : null,
    forSavekeadaanSdBulan         : null,
    namaKegiatan                  : null,
    namaInstansi                  : null,
    unitKerjaEselon1              : null,
    displayKeadaanSdBulan         : null,
    displayTglTerimaDokumenTemuan : null,
    noLHA                         : null,
    tglLHA                        : null,
    footer                        : null,
    header                        : null,
    isEdit                        : null,
  }

  namaSatker = {
    namaSatker: null
  }

  modelIsiDokumen = {
    id                       : null, 
    flagId                   : null,
    statusTindakLanjut       : null,
    noUraianTemuan           : null,
    kodeRekomendasi          : null,
    subNomorRekomendasi      : null,
    kodeRingkasanTindakLanjut: null,
    uraianTemuan             : null,
    rekomendasi              : null,
    ringkasanTindakLanjut    : null,
    tindakLanjut             : null,
    satkerId                 : null,
    ppkId                    : null,
    dokumenTemuanId          : null,
    tindakLanjutId           : null,
    responDokumenTemuanId    : null,
    titleHeader              : null,
    nomorHeader              : null,
    responTindakLanjut       : null,
    dokumenTindakLanjut      : null,
    
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
    if(this.modelIsiDokumen.id == null || (this.modelIsiDokumen.id != null && !this.isResponseTL)){ //add new || edit dokumen yg blm di tindak lanjutin
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
    
    // else if(this.modelIsiDokumen.id != null && this.isResponseTL ){ //edit tindak lanjut
    //   console.log('modalLightInput | edit tindak lanjut')

    //   if(
    //     this.modelIsiDokumen.nomorHeader               == "" ||
    //     this.modelIsiDokumen.titleHeader               == "" ||
    //     this.modelIsiDokumen.noUraianTemuan            == "" || 
    //     this.modelIsiDokumen.uraianTemuan              == "" ||
    //     this.modelIsiDokumen.kodeRekomendasi           == "" ||
    //     this.modelIsiDokumen.rekomendasi               == "" ||
    //     this.modelIsiDokumen.kodeRingkasanTindakLanjut == "" ||
    //     this.modelIsiDokumen.ringkasanTindakLanjut     == "" ||
    //     this.modelIsiDokumen.responTindakLanjut        == ""
    //   ){
    //     this.disabledSimpanTemuan = true;
    //   }else{
    //     this.disabledSimpanTemuan = false;
    //   }

    //   console.log('validasi 2 | nomorHeader ================>',this.modelIsiDokumen.nomorHeader)
    //   console.log('validasi 2 | titleHeader ================>',this.modelIsiDokumen.titleHeader)
    //   console.log('validasi 2 | noUraianTemuan =============>',this.modelIsiDokumen.noUraianTemuan)
    //   console.log('validasi 2 | uraianTemuan ===============>',this.modelIsiDokumen.uraianTemuan)
    //   console.log('validasi 2 | kodeRekomendasi ============>',this.modelIsiDokumen.kodeRekomendasi)
    //   console.log('validasi 2 | rekomendasi ================>',this.modelIsiDokumen.rekomendasi)
    //   console.log('validasi 2 | kodeRingkasanTindakLanjut ==>',this.modelIsiDokumen.kodeRingkasanTindakLanjut)
    //   console.log('validasi 2 | ringkasanTindakLanjut ======>',this.modelIsiDokumen.ringkasanTindakLanjut)
    //   console.log('validasi 2 | responTindakLanjut ======>',this.modelIsiDokumen.responTindakLanjut)
    // }
  }

  simpanForm(){
    this.isOpenEachFormTemuan = false;
    console.log('simpanForm ====>')
    this.closeAlldokumenForm();
  }


  namafile :any
  tmpFileDokumen:any
  handleFileInput(files :FileList){
    console.log('handleFileInput ===>',files)
    this.namafile = files[0].name;
    this.modelIsiDokumen.dokumenTindakLanjut = files;
    this.tmpFileDokumen = files;
    // console.log('uploadFileName ===>',this.modelApprovalDoc.fileDokumen);
  }

  

  onCancelFormIsiDokumen(key){
    this.isOpenEachFormTemuan = false;
    this.closeAlldokumenForm();

    console.log('onCancelFormIsiDokumen | before ===>',this.tmpValue);
    this.modelIsiDokumen[this.tmpKey] = this.tmpValue
    console.log('onCancelFormIsiDokumen | modelIsiDokumen ===>',this.tmpKey);
  }

  showBtnTambahTemuan = true;
  // showBtnSaveTemuan = false;
  showBtnCancelTemuan = false;

  showFormTemuan = false;

  addTemuan(satkerId,ppkId){
    this.flagEdit = 0;
    this.showFormTemuan = true;
    // this.showBtnSaveTemuan = true;
    this.showBtnCancelTemuan = true;
    this.showBtnTambahTemuan = false;
    this.closeAlldokumenForm();
    this.clearModel_isiDokumen();
    this.modelIsiDokumen.flagId = new Date().getTime(),      
    this.modelIsiDokumen.satkerId = satkerId,   
    this.modelIsiDokumen.ppkId = ppkId  
    this.validasiBtnSimpanTemuan();
    console.log('addTemuan | newModel ===>',this.modelIsiDokumen);
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

  clearModel_DokumenTemuan(){
    this.modelDokumenTemuan = {
      id                            : null,
      jenisDokumenTemuanId          : null,
      tglTerimaDokumenTemuan        : null,
      deadlineDokumenTemuan         : null,
      keadaanSdBulan                : null,
      forSavekeadaanSdBulan         : null,
      namaKegiatan                  : null,
      namaInstansi                  : null,
      unitKerjaEselon1              : null,
      displayKeadaanSdBulan         : null,
      displayTglTerimaDokumenTemuan : null,
      noLHA                         : null,
      tglLHA                        : null,
      footer                        : null,
      header                        : null,
      isEdit                        : null,

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
      if(this.isResponseTL || this.batchDokumen[i].id != null){
        if(this.batchDokumen[i].id == this.modelIsiDokumen.id){
          console.log('batalTemuan | replaced successfully')
          this.batchDokumen[i] = this.tmpEditDdokumen
        }else{
          console.log('batalTemuan | replace fail')
        }
      }else{
        if(this.batchDokumen[i].flagId == this.modelIsiDokumen.flagId){
          console.log('batalTemuan | replaced successfully')
          this.batchDokumen[i] = this.tmpEditDdokumen
        }else{
          console.log('batalTemuan | replace fail')
        }
      }
    }
  

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


  printPDFcss(){
    // $('#kertasa4-forPrint').show().printElement();
    window.print();
	  return false;
  }


  downloadDokumenHTML2CANVAS(){
    // console.log('downloadDokumen ===>')

    var HTML_Width = $("#kertasa4-forPrint").width();
		var HTML_Height = $("#kertasa4-forPrint").height();
		var top_left_margin = 8;
		var PDF_Width = HTML_Width+(top_left_margin*2);
		var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
		var canvas_image_width = HTML_Width;
		var canvas_image_height = HTML_Height;
		
		var totalPDFPages = (Math.ceil(HTML_Height/PDF_Height)-1);
		

		html2canvas($("#kertasa4-forPrint")[0],{allowTaint:true}).then(function(canvas) {
			canvas.getContext('2d');
			console.log('downloadDokumen | canvas ===>',canvas)
      console.log('hight and width canvas ====>', canvas.height+"  "+canvas.width);
			
			var imgData = canvas.toDataURL("image/jpeg", 1.0);
      var pdf = new jsPDF('l', 'pt', [841.89, 595.28]); //The first Param is for landscape or portrait
      
		    pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);
        // pdf.addImage(imgData, 'jpeg', 15, 40, 200, 114)
			
			for (var i = 1; i <= totalPDFPages; i++) { 
				pdf.addPage(PDF_Width, "l");
				pdf.addImage(imgData, 'jpeg', top_left_margin, - (PDF_Height*i)+(top_left_margin*4) ,canvas_image_width,canvas_image_height-100);
        // pdf.addImage(imgData, 'jpeg', 15, - (595.28*i)+(15*4) ,841.89 ,595.28);
			}
		
      pdf.save("Dokumen Temuan Testing.pdf");
    });
  }



  editorValue: string;
  editorValueFooter: string;  
  popupVisible: boolean;

  toolbarButtonOptions :any = {
      text: 'Show markup',
      stylingMode: 'text',
      onClick: () => this.popupVisible = true
  };

  // onSatkerChange(id){
  //   this.modelIsiDokumen.ppkId = null;
  //   console.log('onSatkerChange ===>',id);
  //   this.masterPpkService.getPPKbyId(id).subscribe(
  //     data => {
  //       console.log('Get data PPK success | getPPKbyId ===>',data);
  //       this.ListPpk = data.result;
  //       console.log('ListPpk ===>',this.ListPpk);
  //     },
  //     error => {
  //       console.log('Get data PPK error   | getPPKbyId ===>',error);
  //       // notify({ message: "Whoops! failed to Get data",position: {my: "center top",at: "center top"}}, "error", 3000)
  //       Swal.fire(
  //         'Whoops Failed', 
  //         'Tidak dapat mengambil data PPK', 
  //         'error'
  //       )
  //     }
  //   )
  // }

  ListPpk = [];
  createNewTindakLanjut()
  {
    this.modelIsiDokumen.ppkId = null;
    // console.log('onSatkerChange ===>',id);
    
    this.modelIsiDokumen.satkerId = this.dataSatker.id;
    this.namaSatker.namaSatker = this.dataSatker.namaSatker;
    
    this.masterPpkService.getPPKbyId(this.dataSatker.id).subscribe(
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

  btnTambahTemuan(){
    this.modelIsiDokumen.satkerId = "";
    this.modelIsiDokumen.ppkId = ""
  }


  isProgress = 1;
  showBtnSimpan = false;
  progressStatus(step){
    this.isProgress = step;

    console.log('showBtnSimpan ===>', this.showBtnSimpan)
    console.log('progres1Validation ===>', this.progres1Validation)

    if(step == 1){
      $('#step1').addClass('is-active');
      this.showBtnSimpan = false;
    }else if(step == 2){
      this.showBtnSimpan = false;
      $('#step1').addClass('is-complete');
      $('#step2').addClass('is-active');

      this.batchDokumen.push(
        {
          id                       : 999999, 
          flagId                   : 999999,
          tipeDokumenId            : 1,
          satkerId                 : 1,
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


    }else if(step == 3){
      if(this.batchDokumen.length > 0){
        this.showBtnSimpan = true;
      }else{
        this.showBtnSimpan = false;

      }
      $('#step1').addClass('is-complete');
      $('#step2').addClass('is-complete');
      $('#step3').addClass('is-active');
    }
  }

  windowMode = "grid"; // create|grid|edit|view
  windowModeView(mode){
    this.windowMode = mode;

    if(this.windowMode == 'create'){
      $('.uk-breadcrumb').append('<li class="uk-disabled" id="create"><a>Buat</a></li>');
      $('.uk-breadcrumb #edit').remove();
      this.isResponseTL = false;
      this.keteranganDokumenId = 0;
      this.clearModel_DokumenTemuan();
      this.clearModel_isiDokumen();

      this.isiHardcode();
      this.modelDokumenTemuan.footer = this.footerTemplate;
      this.modelDokumenTemuan.jenisDokumenTemuanId = this.jenisDokumenTemuanId
      this.progres1Validation = false;


      this.batchDokumen.splice(0);
    }else if (this.windowMode == 'edit'){
      $('.uk-breadcrumb').append('<li class="uk-disabled" id="edit"><a>Edit</a></li>')
      $('.uk-breadcrumb #create').remove();
    }else if(this.windowMode == 'grid'){
      $('.uk-breadcrumb #edit').remove();
      $('.uk-breadcrumb #create').remove();

      $('#step1').addClass('is-active');
      $('#step1').removeClass('is-complete');
      $('#step2').removeClass('is-active');
      $('#step2').removeClass('is-complete');
      $('#step3').removeClass('is-active');
      $('#step3').removeClass('is-complete');

    }
  }


  previewDokumen(){
    console.log('previewDokumen | modelDokumenTemuan ===>',this.modelDokumenTemuan);
    console.log('previewDokumen | modelIsiDokumen ===>',this.modelIsiDokumen);
    console.log('previewDokumen | batchDokumen ===>',this.batchDokumen);
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


  ListDokumenTemuan = [];
  dataSatker:any = {};
  getDataDokumenTemuan(){
    // var generateURL =  '?jenisDokumen='bpk/inspektorat''
    var generateURL =  '?jenisDokumen=bpk'
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

  errorTokenHabis(){
    Swal.fire(
      'Whoops! Waktu Akses Habis', 
      'Harap Login ulang untuk melanjutkan', 
      'error'
    )
    $('#parentSignOut').click();
  }


 


  doReset(){
    console.log('this.filterData ===>',this.filterData)
    this.filterData = {noLHA:"", jenisDokumenTemuanId:null, tglLHA:null, namaKegiatan:""};
  }

  cleanBlankKey(obj){
    for (var propName in obj) { 
      if (obj[propName] == null || obj[propName] == undefined || obj[propName] == "" ) {
        delete obj[propName];
      }
    }
    return obj;
  }

  filterData = {noLHA:"", jenisDokumenTemuanId:null, tglLHA:null, namaKegiatan:""};
  doSearch(filter){
    this.filterData = filter; 
    console.log('doSearch ===>',this.filterData);

    this.filterData = this.cleanBlankKey(this.filterData);

    this.dokumenService.searchDokumenTemuan(this.filterData).subscribe(
      data => {
        console.log('searchPPK PPK success | searchPPK ===>',data);
        this.ListDokumenTemuan = data.result;
      },
      error => {
        console.log('searchPPK PPK error   | searchPPK ===>',error);
      }
    )
  }


  onBatalEditTemuanClick(){
    console.log('onBatalEditTemuanClick | data ====>');
    this.batchDokumen.push(this.tmpEditDdokumen);
  }

  onDeleteTemmuanClick(data){
    console.log('onDeleteTemmuanClick | data ====>',data);

    this.batchDokumen = _.remove(this.batchDokumen, function(n){
      if(typeof data.flagId != undefined){
        return n.flagId != data.flagId
      }else{
        return n.id != data.id
      }
    })

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


  modelTindakLanjut = {id:null};
  onEditTindakLanjutGridClick(row){
    console.log('onEditTindakLanjutGridClick ===>',row);
    this.windowModeView('edit');
    this.isResponseTL = true;

    this.dokumenService.getDetailTindaKlanjutByID(row.data.id).subscribe(
      (data:any)=>{
        console.log('onEditTindakLanjutGridClick | getDetailTindaKlanjutByID Success',data);

        this.modelDokumenTemuan = data.result;
        this.modelDokumenTemuan.keadaanSdBulan = this.onHalfDateChange(this.modelDokumenTemuan.keadaanSdBulan);
        this.batchDokumen.splice(0);
        data.result.resultDokumen.responTindakLanjut = data.result.resultDokumen.responTindakLanjut == null? '':data.result.resultDokumen.responTindakLanjut
        this.batchDokumen.push(data.result.resultDokumen)
        console.log('onEditTindakLanjutGridClick | this.modelTindakLanjut',this.modelTindakLanjut);

      },
      error =>{
        console.log('onEditTindakLanjutGridClick | getDetailTindaKlanjutByID Error',error)
        this.isiHardcode();

      }
    )



  }


  ModelDokumenTemuan = {};
  isResponseTL = false;
  onEditTemuanGridClick(row){
    console.log('btnEdit ===>',row);
    this.isResponseTL = false;
    this.windowModeView('edit');
    this.progres1Validation = true;
    

    this.dokumenService.getDetailDokumenTemuanGridView(row.data.id).subscribe(
      (data:any) => {
        console.log('getDetailDokumenTemuanGridView Detail success | getDetailDokumenTemuanGridView ===>',data);
        this.modelDokumenTemuan = data.result;
        this.modelDokumenTemuan.isEdit = row.data.isEdit;
        // var keadaanSdBulan = t his.fullDateToHalfDate(this.modelDokumenTemuan.keadaanSdBulan);
        this.modelDokumenTemuan.keadaanSdBulan = this.onHalfDateChange(this.modelDokumenTemuan.keadaanSdBulan );
        
        console.log('this.modelDokumenTemuan ===>', this.modelDokumenTemuan)
        this.batchDokumen = data.result.resultDokumen;
      },
      error => {
        console.log('getDetailDokumenTemuanGridView Detail error   | getDetailDokumenTemuanGridView ===>',error);
      }
    )

  }

  deleteDokumen = "";
  selectedForDelete = {};
  modalDelete(row){
    console.log('modalDelete ===>',row);
    this.deleteDokumen = row.noLHA;
    this.selectedForDelete = row;
  }

  doDelete(){
    console.log('selected for delete ===>',this.selectedForDelete);

    this.dokumenService.deleteDokumenTemuan(this.selectedForDelete).subscribe(
      data => {
        console.log('Delete success | deleteDokumenTemuan ===>',this.selectedForDelete)
        // notify({ message: "Yosssh! Success to Delete data",position: { my: "center top",at: "center top"}}, "success", 3000);
        Swal.fire(
          'Yay Success!', 
          'Data berhasil dihapus', 
          'success'
        )
        // this.ListDokumenTemuan = _.remove(this.ListDokumenTemuan, function(data){
        //   return data.id != data.result.id;
        // })
        $('#btnHapus').click();
      },
      error => {
        console.log('Delete error   | deleteDokumenTemuan ===>',error);
        // notify({ message: "Whoops! failed to Delete data",position: {my: "center top",at: "center top"}}, "error", 3000)
        Swal.fire(
          'Whoops Failed', 
          'Tidak Berhasil Menghapus Data', 
          'error'
        )
      }
    )

  }


  doSave(data){

    if(this.windowMode == 'edit'){
      data = this.ModelDokumenTemuan;
    }

    if(data.id == null){
      console.log('doSave | data ===>',data);
      this.dokumenService.createDokumenTemuan(this.dokumenTemuanForm.value).subscribe(
        data => {
          console.log('create success | createDokumenTemuan ===>',data)
          // notify({ message: "Yosssh! Success to Create data",position: { my: "center top",at: "center top"}}, "success", 3000);
          Swal.fire(
            'Yay Success!', 
            'Data berhasil ditambahkan', 
            'success'
          )
          this.ListDokumenTemuan.push(data.result)
          this.windowModeView('grid');

          

        },
        error => {
          console.log('create error   | createDokumenTemuan ===>',error);
          // notify({ message: "Whoops! failed to Create data",position: {my: "center top",at: "center top"}}, "error", 3000)
          Swal.fire(
            'Whoops Failed', 
            'Data tidak berhasil ditambahkan', 
            'error'
          )
        }
      )
    }else{
      console.log('do update Data ===>',data)
      this.dokumenService.updateDokumenTemuan(data).subscribe(
        result => {
          console.log('update success | updateDokumenTemuan ===>',result)
          // notify({ message: "Yosssh! Success to Update data",position: { my: "center top",at: "center top"}}, "success", 3000);
          Swal.fire(
            'Yay Success!', 
            'Data berhasil disimpan', 
            'success'
          )
          this.windowModeView('grid');
          console.log('ListDokumenTemuan ===>',this.ListDokumenTemuan);

        },
        error => {
          console.log('update error   | updateDokumenTemuan ===>',error);
          // notify({ message: "Whoops! failed to Update data",position: {my: "center top",at: "center top"}}, "error", 3000)
          Swal.fire(
            'Whoops Failed', 
            'Data tidak berhasil simpan', 
            'error'
          )
        }
      )
    }
    
    
  }


  getTodayString(){
    var originalDate = new Date();
    var day = ("0" + originalDate.getDate()).slice(-2);
    var month = ("0" + (originalDate.getMonth() + 1)).slice(-2);
    var year = originalDate.getFullYear();
    var result = year+'-'+month+'-'+day;
    console.log('getTodayString | result ===>',result);
    return result
  }


  optionsHtml2Pdf = {
    filename   : 'HTML2PDF.pdf',
    jsPDF      : {orientation: 'landscape'},
    margin     : [10,2,50,2],
    image      : { type      : 'png' },
    html2canvas: { scale     : 1 },

  }
  downloadHtml2Pdf(){

    this.isLoading = true;
    var element = document.getElementById('kertasa4-forPrint');
    html2pdf()
    .from(element)
    .set(this.optionsHtml2Pdf)
    .save(this.isLoading = false)
   

  }



  doSaveResponTL(){
    console.log('doSaveResponTL | this.modelTindakLanjut',this.modelTindakLanjut);

    var modelResponTL = this.batchDokumen[0];
    modelResponTL.tglResponTindakLanjut= this.getTodayString();
    modelResponTL.responTindakLanjut   = this.batchDokumen[0].responTindakLanjut;
    modelResponTL.isRevisi             = this.batchDokumen[0].statusTindakLanjut == "Dalam Proses"? 1: 0;
    console.log('doSaveResponTL | modelResponTL',modelResponTL);



    this.dokumenService.createResponTindakLanjut(modelResponTL).subscribe(
      data =>{
        console.log('doSaveResponTL | saveResponTindakLanjut Success ===>',data);
        this.windowModeView('grid');
        Swal.fire(
          'Yay Success!', 
          'Data berhasi disimpan', 
          'success'
        )
      },
      error =>{
        console.log('doSaveResponTL | saveResponTindakLanjut error ===>',error);
        Swal.fire(
          'Whoops Failed!', 
          'Data tidak berhasi disimpan', 
          'error'
        )
      }
    )
  }


  GeneratePDFView(data){
    console.log('GeneratePDFView | data ===>',data);

    this.modelDokumenTemuan = data;
    this.batchDokumen.splice(0);

    this.dokumenService.getDataGeneratePDF(data.id).subscribe(
      data =>{
        console.log('GeneratePDFView | getDataGeneratePDF Success ===>',data);

        this.batchDokumen = data.result.resultDokumen

      },
      error =>{
        console.log('GeneratePDFView | getDataGeneratePDF error ===>',error);
      }
    )







    console.log('GeneratePDFView | modelDokumenTemuan ===>',this.modelDokumenTemuan);
    console.log('GeneratePDFView | modelIsiDokumen ===>',this.modelIsiDokumen);
    console.log('GeneratePDFView | batchDokumen ===>',this.batchDokumen);
  }

  onDownloadClick(row){
    console.log('row.data ===>',row);

    // if(row.fileDokumen == undefined){
    //   row.fileDokumen = this.namafile
    // }
    this.isLoading = true;

    this.dokumenService.downloadDocumentTindakLanjut(row.dokumenTindakLanjut).subscribe(
      (result:any) => {
        console.log('download dokumen sukses',result);

        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(result)
        a.href = objectUrl
        a.download = row.dokumenTindakLanjut+'.jpg';
        a.click();
        URL.revokeObjectURL(objectUrl);

        this.isLoading = false;


      },
      error =>{
        this.isLoading = false;
        console.log('download dokumen Gagal',error)
        if(error.result !== undefined){
          // notify({ message: "Whoops!" +error.result ,position: {my: "center top",at: "center top"}}, "error", 3000)
          Swal.fire(
            'Whoops Failed', 
            'Data tidak mengambil data'+ error.result, 
            'error'
          )
        }else{
          // notify({ message: "Whoops! Gagal mengunduh data",position: {my: "center top",at: "center top"}}, "error", 3000)
        }
      }
    );
    

  }


  onSubmit(){
    console.log('onSubmit | ModelDokumenTemuan',this.modelDokumenTemuan);
    console.log('onSubmit | windowMode',this.windowMode);
    this.modelDokumenTemuan.keadaanSdBulan = this.modelDokumenTemuan.forSavekeadaanSdBulan;

    // console.log('bacth update ===>',JSON.stringify(this.batchDokumen));

    if(this.windowMode == 'edit' && !this.isResponseTL){ // update temuan dan TL yg blm di tindak lanjuti
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
    


    }else if(this.windowMode == 'edit' && this.isResponseTL){ // simpan respon Tindak lanjut
      console.log('onSubmit | simpan respon Tindak lanjut',this.windowMode);

    }else if(this.windowMode =='create'){ // create new data
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


  testToast(req){
    if(req=='success'){
      notify({ message: "Yosssh! Success to Create data",position: {my: "center top",at: "center top"}}, "success", 3000)
    }else if(req=='error'){
      notify({ message: "Whoops! error to Create data",position: {my: "center top",at: "center top"}}, "error", 3000)
    }else if(req=='warning'){
      notify({ message: "Wawwww! warning to Create data",position: {my: "center top",at: "center top"}}, "warning", 3000)
    }else if(req=='info'){
      notify({ message: "Info! info to Create data",position: {my: "center top",at: "center top"}}, "info", 3000)
    }
  }

  
  doEditGeneral(){
    this.dokumenService.updateDokumenTemuan(this.modelDokumenTemuan ).subscribe(
      (data:any)=>{
        console.log('updateDokumenTemuan Success ===>',data.result);   
      },
      error =>{
        console.log('updateDokumenTemuan Gagal ===>',error)
      }
    )
  }


  head = [['No.', 'Uraian Temuan', 'Kode', 'Rekomendasi', 'Kode', 'Ringkasan Tindak Lanjut', 'Status Tindak Lanjut', 'Tindak lanjut']]

  data = [
    [1, 'Finland', 7.632, 'Helsinki'],
    [2, 'Norway', 7.594, 'Oslo'],
    [3, 'Denmark', 7.555, 'Copenhagen'],
    [4, 'Iceland', 7.495, 'Reykjavík'],
    [5, 'Switzerland', 7.487, 'Bern'],
    [9, 'Sweden', 7.314, 'Stockholm'],
    [73, 'Belarus', 5.483, 'Minsk'],
  ]

  header = "MATRIK PERKEMBANGAN PELAKSANAAN TINDAK LANJUT TERHADAP LAPORAN HASIL AUDIT INSPEKTORAT JENDERAL KEMENTERIAN LINGKUNGAN HIDUP DAN KEHUTANAN";

  dataPrint = [];
  
  createPDFAutoTable() {
    var doc = new jsPDF('l', 'pt', [841.89, 595.28]);


    for(var i in this.batchDokumen){
      this.dataPrint.push(
        [
          this.batchDokumen[i].noUraianTemuan,
          this.batchDokumen[i].kodeRekomendasi,
          this.batchDokumen[i].rekomendasi,
          '<div> [innerHTML]="'+this.batchDokumen[i].kodeRingkasanTindakLanjut+'" | keepHtml</div>',
          this.batchDokumen[i].ringkasanTindakLanjut,
          this.batchDokumen[i].statusTindakLanjut,
          this.batchDokumen[i].tindaklanjut
        ]
      )
    }

    doc.setFontSize(14);
    doc.text(this.header, 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);


    (doc as any).autoTable({
      head: this.head,
      body: this.dataPrint,
      theme: 'grid',
      didDrawCell: data => {
        console.log(data.column.index)
      }
    })

    // Open PDF document in new tab
    doc.output('dataurlnewwindow')

    // Download PDF document  
    doc.save('table.pdf');
  }



  employees = [{
    "ID": 1,
    "FirstName": "John",
    "LastName": "Heart",
    "Prefix": "Mr.",
    "Position": "CEO",
    "Picture": "images/employees/01.png",
    "BirthDate": "1964/03/16",
    "HireDate": "1995/01/15",
    "Notes": "John has been in the Audio/Video industry since 1990. He has led DevAv as its CEO since 2003. When not working hard as the CEO, John loves to golf and bowl. He once bowled a perfect game of 300.",
    "Address": "351 S Hill St.",
    "State": "California",
    "City": "Los Angeles"
}, {
    "ID": 2,
    "FirstName": "Olivia",
    "LastName": "Peyton",
    "Prefix": "Mrs.",
    "Position": "Sales Assistant",
    "Picture": "images/employees/09.png",
    "BirthDate": "1981/06/03",
    "HireDate": "2012/05/14",
    "Notes": "Olivia loves to sell. She has been selling DevAV products since 2012.  Olivia was homecoming queen in high school. She is expecting her first child in 6 months. Good Luck Olivia.",
    "Address": "807 W Paseo Del Mar",
    "State": "California",
    "City": "Los Angeles"
}, {
    "ID": 3,
    "FirstName": "Robert",
    "LastName": "Reagan",
    "Prefix": "Mr.",
    "Position": "CMO",
    "Picture": "images/employees/03.png",
    "BirthDate": "1974/09/07",
    "HireDate": "2002/11/08",
    "Notes": "Robert was recently voted the CMO of the year by CMO Magazine. He is a proud member of the DevAV Management Team. Robert is a championship BBQ chef, so when you get the chance ask him for his secret recipe.",
    "Address": "4 Westmoreland Pl.",
    "State": "Arkansas",
    "City": "Bentonville"
}];



  removeTags(str) {
    if ((str===null) || (str===''))
    return false;
    else
    str = str.toString();
    return str.replace( /(<([^>]+)>)/ig, '');
  }

  contentReady(e) {
  if (!e.component.getSelectedRowKeys().length)
      e.component.selectRowsByIndexes(0);
  }
  selectionChanged(e) {
    console.log('selectionChanged selectedRowsData ===>',e.selectedRowsData[0])
    console.log('selectionChanged event ===>',e)
      e.component.collapseAll(-1);
      e.component.expandRow(e.currentSelectedRowKeys[0]);

      if(this.ListDokumenTemuan.length > 0){
        if(e.selectedRowsData[0] == undefined){
          e.selectedRowsData[0] = this.ListDokumenTemuan[0]
        }
  
        this.dokumenService.getDetailDokumenTemuanGridView(e.selectedRowsData[0].id).subscribe(
          data => {
            console.log('selectionChanged Detail success ===>',data);  
            e.selectedRowsData[0].dataTindakLanjut = data.result.resultDokumen;
          },
          error => {
            console.log('selectionChanged Detail error ===>',error);
          }
        )
      }

  }

}
