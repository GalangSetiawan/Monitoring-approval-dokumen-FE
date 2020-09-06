import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
import { TokenService } from '../../shared/token.service';
import { AuthStateService } from '../../shared/auth-state.service';
import { DokumenserviceService } from './../../shared/dokumenservice.service';
import { MastersatkerService } from './../../shared/mastersatker.service';
import { MasterppkService } from './../../shared/masterppk.service';

declare var UIkit: any;



import * as _ from "lodash";
import * as $ from 'jquery'
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas'
import 'jspdf-autotable';


import notify from 'devextreme/ui/notify';

import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';

@Component({
  selector: 'app-temuanbpk',
  templateUrl: './temuanbpk.component.html',
  styleUrls: ['./temuanbpk.component.css']
})
export class TemuanbpkComponent implements OnInit {

  dokumenTemuanForm: FormGroup;
  public titleHeader = "Master DokumenTemuan";

  constructor(
    public masterSatkerService: MastersatkerService,
    public dokumenService     : DokumenserviceService,
    public masterPpkService   : MasterppkService,

    private token             : TokenService,
    public fb                 : FormBuilder,
    private authState         : AuthStateService,
  ) {}

  ngOnInit(): void {
    this.getDataJenisDokumenTemuan();
    this.getDataSatker();
    this.getDataDokumenTemuan();
    $('#breadCrumbTitle a').text('Dokumen Temuan BPK');
  }


  head = [['ID', 'Country', 'Rank', 'Capital']]

  data = [
    [1, 'Finland', 7.632, 'Helsinki'],
    [2, 'Norway', 7.594, 'Oslo'],
    [3, 'Denmark', 7.555, 'Copenhagen'],
    [4, 'Iceland', 7.495, 'Reykjavík'],
    [5, 'Switzerland', 7.487, 'Bern'],
    [9, 'Sweden', 7.314, 'Stockholm'],
    [73, 'Belarus', 5.483, 'Minsk'],
  ]

  

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
        notify({ message: "Whoops! failed to Get data",position: {my: "center top",at: "center top"}}, "error", 3000)
      }
    )
  }
  

  progres1Validation = false;
  progres1ValidationFunction(){
    if(
      (this.modelDokumenTemuan.jenisDokumenTemuanId == null || this.modelDokumenTemuan.jenisDokumenTemuanId == "" ) ||
      (this.modelDokumenTemuan.tglTerimaDokumenTemuan == null || this.modelDokumenTemuan.tglTerimaDokumenTemuan == "" ) ||
      (this.modelDokumenTemuan.deadlineDokumenTemuan == null || this.modelDokumenTemuan.deadlineDokumenTemuan == "" ) ||
      (this.modelDokumenTemuan.keadaanSdBulan == null || this.modelDokumenTemuan.keadaanSdBulan == "" ) ||
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
      id                           : 2,
      jenisDokumenTemuanId         : 2,
      tglTerimaDokumenTemuan       : '2020-12-31',
      deadlineDokumenTemuan        : '2021-01-31',
      keadaanSdBulan               : '2020-12',
      forSavekeadaanSdBulan        : '2020-12-01',
      namaKegiatan                 : "Audit Pelaksanaan Tusi Tahun 2015",
      namaInstansi                 : "Ditjen Penegakan Lingkungan Hidup dan Kehutanan (PHLHK)",
      unitKerjaEselon1             : "Ditjen PHLHK",
      displayKeadaanSdBulan        : 'Desember 2020',
      displayTglTerimaDokumenTemuan: '31',
      noLHA                        : 'LHA. 26/Itjen-Ins.3/Rhs/2016',
      tglLHA                       : '2021-01-31',
      footer                       : '<style>br{margin-top: -50px !important;}</style>'+'<p>Jakarta, September 2017 <br> Kepala Bagian Keuangan dan Umum</p><p></p><p><br></p><p><strong><u>S u w a r t i, S H</u></strong> <br>NIP 19671014 199303 2 001</p>',
      header                       : 'MATRIK PERKEMBANGAN PELAKSANAAN TINDAK LANJUT TERHADAP LAPORAN HASIL AUDIT INSPEKTORAT JENDERAL KEMENTERIAN LINGKUNGAN HIDUP DAN KEHUTANAN',
    }

    this.batchDokumen = [
      {
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
        ppkId                    : 1
      },
    ]
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
  }


  modelIsiDokumen = {
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
      this.is_noUraianTemuan            = true;
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
    }else if(key == 'kodeRekomendasi'){
      this.tmpValue = this.modelIsiDokumen.kodeRekomendasi;
      this.is_noUraianTemuan            = false;
      this.is_kodeRekomendasi           = true;
      this.is_subNomorRekomendasi       = false;
      this.is_kodeRingkasanTindakLanjut = false;
      this.is_statusTindakLanjut        = false;
      this.is_uraianTemuan              = false;
      this.is_rekomendasi               = false;
      this.is_tindakLanjut              = false;
      this.is_ringkasanTindakLanjut     = false;
      this.is_nomorHeader               = false;
      this.is_titleHeader               = false; 
    }else if(key == 'subNomorRekomendasi'){
      this.tmpValue = this.modelIsiDokumen.subNomorRekomendasi;
      this.is_noUraianTemuan            = false;
      this.is_kodeRekomendasi           = false;
      this.is_subNomorRekomendasi       = true;
      this.is_kodeRingkasanTindakLanjut = false;
      this.is_statusTindakLanjut        = false;
      this.is_uraianTemuan              = false;
      this.is_rekomendasi               = false;
      this.is_tindakLanjut              = false;
      this.is_ringkasanTindakLanjut     = false;
      this.is_nomorHeader               = false;
      this.is_titleHeader               = false; 
    }else if(key == 'kodeRingkasanTindakLanjut'){
      this.tmpValue = this.modelIsiDokumen.kodeRingkasanTindakLanjut;
      this.is_noUraianTemuan            = false;
      this.is_kodeRekomendasi           = false;
      this.is_subNomorRekomendasi       = false;
      this.is_kodeRingkasanTindakLanjut = true;
      this.is_statusTindakLanjut        = false;
      this.is_uraianTemuan              = false;
      this.is_rekomendasi               = false;
      this.is_tindakLanjut              = false;
      this.is_ringkasanTindakLanjut     = false;
      this.is_nomorHeader               = false;
      this.is_titleHeader               = false; 
    }else if(key == 'statusTindakLanjut'){
      this.tmpValue = this.modelIsiDokumen.statusTindakLanjut;
      this.is_noUraianTemuan            = false;
      this.is_kodeRekomendasi           = false;
      this.is_subNomorRekomendasi       = false;
      this.is_kodeRingkasanTindakLanjut = false;
      this.is_statusTindakLanjut        = true;
      this.is_uraianTemuan              = false;
      this.is_rekomendasi               = false;
      this.is_tindakLanjut              = false;
      this.is_ringkasanTindakLanjut     = false;
      this.is_nomorHeader               = false;
      this.is_titleHeader               = false; 
    }else if(key == 'uraianTemuan'){ //==============================================
      this.tmpValue = this.modelIsiDokumen.uraianTemuan;
      this.is_noUraianTemuan            = false;
      this.is_kodeRekomendasi           = false;
      this.is_subNomorRekomendasi       = false;
      this.is_kodeRingkasanTindakLanjut = false;
      this.is_statusTindakLanjut        = false;
      this.is_uraianTemuan              = true;
      this.is_rekomendasi               = false;
      this.is_tindakLanjut              = false;
      this.is_ringkasanTindakLanjut     = false;
      this.is_nomorHeader               = false;
      this.is_titleHeader               = false; 
    }else if(key == 'rekomendasi'){
      this.tmpValue = this.modelIsiDokumen.rekomendasi;
      this.is_noUraianTemuan            = false;
      this.is_kodeRekomendasi           = false;
      this.is_subNomorRekomendasi       = false;
      this.is_kodeRingkasanTindakLanjut = false;
      this.is_statusTindakLanjut        = false;
      this.is_uraianTemuan              = false;
      this.is_rekomendasi               = true;
      this.is_tindakLanjut              = false;
      this.is_ringkasanTindakLanjut     = false;
      this.is_nomorHeader               = false;
      this.is_titleHeader               = false; 
    }else if(key == 'tindakLanjut'){
      this.tmpValue = this.modelIsiDokumen.tindakLanjut;
      this.is_noUraianTemuan            = false;
      this.is_kodeRekomendasi           = false;
      this.is_subNomorRekomendasi       = false;
      this.is_kodeRingkasanTindakLanjut = false;
      this.is_statusTindakLanjut        = false;
      this.is_uraianTemuan              = false;
      this.is_rekomendasi               = false;
      this.is_tindakLanjut              = true;
      this.is_ringkasanTindakLanjut     = false;
      this.is_nomorHeader               = false;
      this.is_titleHeader               = false; 
    }else if(key == 'ringkasanTindakLanjut'){
      this.tmpValue = this.modelIsiDokumen.ringkasanTindakLanjut;
      this.is_noUraianTemuan            = false;
      this.is_kodeRekomendasi           = false;
      this.is_subNomorRekomendasi       = false;
      this.is_kodeRingkasanTindakLanjut = false;
      this.is_statusTindakLanjut        = false;
      this.is_uraianTemuan              = false;
      this.is_rekomendasi               = false;
      this.is_tindakLanjut              = false;
      this.is_ringkasanTindakLanjut     = true;
      this.is_nomorHeader               = false;
      this.is_titleHeader               = false; 
    }else if(key == 'nomorHeader'){
      this.tmpValue = this.modelIsiDokumen.nomorHeader;
      this.is_noUraianTemuan            = false;
      this.is_kodeRekomendasi           = false;
      this.is_subNomorRekomendasi       = false;
      this.is_kodeRingkasanTindakLanjut = false;
      this.is_statusTindakLanjut        = false;
      this.is_uraianTemuan              = false;
      this.is_rekomendasi               = false;
      this.is_tindakLanjut              = false;
      this.is_ringkasanTindakLanjut     = false;
      this.is_nomorHeader               = true;
      this.is_titleHeader               = false; 
    }else if(key == 'titleHeader'){
      this.tmpValue = this.modelIsiDokumen.titleHeader;
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
      this.is_titleHeader               = true; 
    }
  }

  simpanForm(){
    this.isOpenEachFormTemuan = false;
    console.log('simpanForm ====>')
    this.is_noUraianTemuan            = false;
    this.is_kodeRekomendasi           = false;
    this.is_subNomorRekomendasi       = false;
    this.is_kodeRingkasanTindakLanjut = false;
    this.is_statusTindakLanjut        = false;
    this.is_uraianTemuan              = false;
    this.is_rekomendasi               = false;
    this.is_tindakLanjut              = false;
    this.is_ringkasanTindakLanjut     = false;
  }
  

  onCancelFormIsiDokumen(key){
    this.isOpenEachFormTemuan = false;

    this.is_noUraianTemuan            = false;
    this.is_kodeRekomendasi           = false;
    this.is_subNomorRekomendasi       = false;
    this.is_kodeRingkasanTindakLanjut = false;
    this.is_statusTindakLanjut        = false;
    this.is_uraianTemuan              = false;
    this.is_rekomendasi               = false;
    this.is_tindakLanjut              = false;
    this.is_ringkasanTindakLanjut     = false;


    console.log('onCancelFormIsiDokumen | before ===>',this.tmpValue);
    this.modelIsiDokumen[this.tmpKey] = this.tmpValue
    console.log('onCancelFormIsiDokumen | modelIsiDokumen ===>',this.tmpKey);
  }

  showBtnTambahTemuan = true;
  showBtnSaveTemuan = false;
  showBtnCancelTemuan = false;

  showFormTemuan = false;

  addTemuan(satkerId,ppkId){
    this.flagEdit = 0;
    this.showFormTemuan = true;
    this.showBtnSaveTemuan = true;
    this.showBtnCancelTemuan = true;
    this.showBtnTambahTemuan = false;
    this.closeAlldokumenForm();
    this.clearModel_isiDokumen();
    this.modelIsiDokumen.flagId = new Date().getTime(),      
    this.modelIsiDokumen.satkerId = satkerId,   
    this.modelIsiDokumen.ppkId = ppkId  

    console.log('addTemuan | newModel ===>',this.modelIsiDokumen);
  }



  clearModel_isiDokumen(){
    this.modelIsiDokumen = {
      flagId                   : null,    
      statusTindakLanjut       : "Tersedia",
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
    }
  }

  flagEdit = 0;
  saveTemuan(flagEdit){
    console.log('saveTemuan | batchDokumen=======>',this.batchDokumen)
    console.log('saveTemuan | modelIsiDokumen ===>',this.modelIsiDokumen)

    if(flagEdit == 1){ // edit Temuan
      console.log('saveTemuan | flagEdit | edit 1 ===>',flagEdit)
      for(var i in this.batchDokumen){
        if(this.modelIsiDokumen.flagId == this.batchDokumen[i].flagId){
          this.batchDokumen[i] = this.modelIsiDokumen;
        }
      }

    }else{ // tambah temuan
      console.log('saveTemuan | flagEdit | add 0 ===>',flagEdit)
      this.batchDokumen.push(this.modelIsiDokumen);
    }
    
    
    this.clearModel_isiDokumen()
    this.showFormTemuan      = false;
    this.showBtnSaveTemuan   = false;
    this.showBtnCancelTemuan = false;
    this.showBtnTambahTemuan = true;
  }


  batalTemuan(){
    this.showFormTemuan = false;

    this.clearModel_isiDokumen()

    this.showBtnTambahTemuan = true;
    this.showBtnSaveTemuan = false;
    this.showBtnCancelTemuan = false;

    console.log('batalTemuan | modelIsiDokumen, id ===>',this.modelIsiDokumen,this.modelIsiDokumen.flagId);
    console.log('batalTemuan | batchDokumen ===>',this.batchDokumen);
    console.log('tmpEditDdokumen | batchDokumen ===>',this.tmpEditDdokumen);

    var findID = _.findIndex(this.batchDokumen, {"flagId":this.modelIsiDokumen.flagId})
    console.log('find ID ===>',findID)
    
    this.batchDokumen.push(this.tmpEditDdokumen);
  

  }



  downloadDokumen(){
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
  header = "MATRIK PERKEMBANGAN PELAKSANAAN TINDAK LANJUT TERHADAP LAPORAN HASIL AUDIT INSPEKTORAT JENDERAL KEMENTERIAN LINGKUNGAN HIDUP DAN KEHUTANAN";

  toolbarButtonOptions :any = {
      text: 'Show markup',
      stylingMode: 'text',
      onClick: () => this.popupVisible = true
  };


  ListPpk = [];
  onSatkerChange(id){
    this.modelIsiDokumen.ppkId = null;
    console.log('onSatkerChange ===>',id);
    this.masterPpkService.getPPKbyId(id).subscribe(
      data => {
        console.log('Get data PPK success | getPPKbyId ===>',data);
        this.ListPpk = data.result;
        console.log('ListPpk ===>',this.ListPpk);
      },
      error => {
        console.log('Get data PPK error   | getPPKbyId ===>',error);
        notify({ message: "Whoops! failed to Get data",position: {my: "center top",at: "center top"}}, "error", 3000)
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
    this.modelDokumenTemuan.forSavekeadaanSdBulan = date;
    var result = this.bulan[bulanIdx] + ' ' + dateString[0];

    console.log('onHalfDateChange | result ===>',result)
    return result;
  }

  fullDateToHalfDate(date){
    console.log('fullDateToHalfDate | date ===>',date);
    var splitDate = date.split('-');
    var result = splitDate[0]+'-'+splitDate[1];
    console.log('fullDateToHalfDate | result ===>',result)
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
      $('.uk-breadcrumb').append('<li class="uk-disabled" id="create"><a>Create</a></li>');
      $('.uk-breadcrumb #edit').remove();
      this.isiHardcode();
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
  

  ListJenisDokumenTemuan=[];
  getDataJenisDokumenTemuan(){
    this.dokumenService.getJenisDokumenTemuan().subscribe(
      (data:any) =>{
        console.log('Get data getJenisDokumenTemuan success | getJenisDokumenTemuan ===>',data.result);
        this.ListJenisDokumenTemuan = data.result;
      },
      error => {
        console.log('Get data getJenisDokumenTemuan error   | getJenisDokumenTemuan ===>',error);
        notify({ message: "Whoops! failed to Get data",position: {my: "center top",at: "center top"}}, "error", 3000)
      }
    )

  }


  ListDokumenTemuan = [];
  getDataDokumenTemuan(){
    this.dokumenService.getDokumenTemuanGridView().subscribe(
      (data:any) =>{
        console.log('Get data getDokumenTemuan success | getDokumenTemuan ===>',data.result);
        this.ListDokumenTemuan = data.result;
      },
      error => {
        console.log('Get data getDokumenTemuan error   | getDokumenTemuan ===>',error);
        notify({ message: "Whoops! failed to Get data",position: {my: "center top",at: "center top"}}, "error", 3000)
      }
    )

  }


 


  doReset(){
    console.log('this.filterData ===>',this.filterData)
    this.filterData = {namaKpa:"", idCabang:null}
  }

  cleanBlankKey(obj){
    for (var propName in obj) { 
      if (obj[propName] == null || obj[propName] == undefined || obj[propName] == "" ) {
        delete obj[propName];
      }
    }
    return obj;
  }

  filterData = {namaKpa:"", idCabang:null}
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
    this.showBtnSaveTemuan = true;
    this.showBtnCancelTemuan = true;
    
    this.showFormTemuan = true;
    this.modelIsiDokumen = data;
    this.tmpEditDdokumen = data;
    console.log('onEditTemuanClick | modelIsiDokumen ====>',this.modelIsiDokumen);


  }


  ModelDokumenTemuan = {};
  onEditClick(row){
    console.log('btnEdit ===>',row);
    this.windowModeView('edit');
    

    this.dokumenService.getDetailDokumenTemuanGridView(row.data.id).subscribe(
      data => {
        console.log('getDetailDokumenTemuanGridView Detail success | getDetailDokumenTemuanGridView ===>',data);

        this.modelDokumenTemuan = data.result;
        // var keadaanSdBulan = this.fullDateToHalfDate(this.modelDokumenTemuan.keadaanSdBulan);
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
    this.deleteDokumen = row.noUraianTemuan;
    this.selectedForDelete = row;
  }

  doDelete(){
    console.log('selected for delete ===>',this.selectedForDelete);

    this.dokumenService.deleteDokumenTemuan(this.selectedForDelete).subscribe(
      result => {
        console.log('Delete success | deleteDokumenTemuan ===>',result)
        notify({ message: "Yosssh! Success to Delete data",position: { my: "center top",at: "center top"}}, "success", 3000);
        this.ListDokumenTemuan = _.remove(this.ListDokumenTemuan, function(data){
          return data.id != result.result.id;
        })
        $('#btnHapus').click();
      },
      error => {
        console.log('Delete error   | deleteDokumenTemuan ===>',error);
        notify({ message: "Whoops! failed to Delete data",position: {my: "center top",at: "center top"}}, "error", 3000)
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
          notify({ message: "Yosssh! Success to Create data",position: { my: "center top",at: "center top"}}, "success", 3000);
          this.ListDokumenTemuan.push(data.result)
          this.windowModeView('grid');

          

        },
        error => {
          console.log('create error   | createDokumenTemuan ===>',error);
          notify({ message: "Whoops! failed to Create data",position: {my: "center top",at: "center top"}}, "error", 3000)
        }
      )
    }else{
      console.log('do update Data ===>',data)
      this.dokumenService.updateDokumenTemuan(data).subscribe(
        result => {
          console.log('update success | updateDokumenTemuan ===>',result)
          notify({ message: "Yosssh! Success to Update data",position: { my: "center top",at: "center top"}}, "success", 3000);
          this.windowModeView('grid');
          console.log('ListDokumenTemuan ===>',this.ListDokumenTemuan);

        },
        error => {
          console.log('update error   | updateDokumenTemuan ===>',error);
          notify({ message: "Whoops! failed to Update data",position: {my: "center top",at: "center top"}}, "error", 3000)
        }
      )
    }
    
    
  }


  onSubmit(){



    console.log('onSubmit | ModelDokumenTemuan',this.ModelDokumenTemuan);
    this.modelDokumenTemuan.keadaanSdBulan = this.modelDokumenTemuan.forSavekeadaanSdBulan;


    this.dokumenService.createDokumenTemuan(this.modelDokumenTemuan).subscribe(
      (data:any)=>{
        console.log('createDokumenTemuan Success ===>',data.result);
        var tmpDokTemuan = data.result;


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
          },
          error =>{
            console.log('createDokumen Gagal ===>',error)
          }
        )

        

      },
      error =>{
        console.log('createDokumenTemuan Gagal ===>',error)
      }
    )


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



  createPdf() {
    var doc = new jsPDF('l', 'pt', [841.89, 595.28]);

    doc.setFontSize(14);
    doc.text(this.header, 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);


    (doc as any).autoTable({
      head: this.head,
      body: this.data,
      theme: 'plain',
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
    console.log('selectionChanged ===>',e.selectedRowsData[0])
      e.component.collapseAll(-1);
      e.component.expandRow(e.currentSelectedRowKeys[0]);
      e.selectedRowsData[0].dataTindakLanjut = [];
      this.dokumenService.getDetailDokumenTemuanGridView(e.selectedRowsData[0].id).subscribe(
        data => {
          console.log('selectionChanged Detail success ===>',data);  
          // for(var i in data.result.resultDokumen){
          //   data.result.resultDokumen[i].DisplayUraianTemuan = this.removeTags(data.result.resultDokumen[i].uraianTemuan);
          // }
          e.selectedRowsData[0].dataTindakLanjut = data.result.resultDokumen;
        },
        error => {
          console.log('selectionChanged Detail error ===>',error);
        }
      )

  }

}
