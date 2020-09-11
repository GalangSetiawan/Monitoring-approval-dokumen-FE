import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './shared/token.service';
import { AuthStateService } from './shared/auth-state.service';
import { AuthService } from './shared/auth.service';
import { FormBuilder, FormGroup } from "@angular/forms";
declare var UIkit: any;


import * as $ from 'jquery'

var toggleFullscreen = true;

export class User {
  id      : Number;
  nama    : String;
  cabang  : String;
  jabatan : String;
  role    : String;
  username: String;
  email   : String;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'monitoring-approval-document';
  isSignedIn: boolean;
  UserProfile: any;
  loginForm: FormGroup;
  errors = null;
  isResetForm = false;
  isLogoutForm = false;
  isWelcomeBar = false;


  constructor(
    private auth: AuthStateService,
    public router: Router,
    public fb: FormBuilder,
    public token: TokenService,
    public authService: AuthService ,
    private authState: AuthStateService,

  ) {
    this.loginForm = this.fb.group({
      username: [],
      password: []
    })
  }

  ngOnInit() {    
    $('#breadCrumbTitle a').text('Dashboard');

    this.auth.userAuthState.subscribe(val => {
        this.isSignedIn = val;
    });

    console.log('this.auth.userAuthState ===>',this.auth)

    if(this.isSignedIn == true){
      this.UserProfile = JSON.parse(localStorage.getItem("UserProfile"));
      console.log('this.UserProfile ===>',this.UserProfile);
    }

    console.log('this.isSignedIn ===>',this.isSignedIn);
    console.log('this.loginForm.value ==>',this.loginForm.value);

    $(document).keydown(function(e) {
      if (e.keyCode === 13) $('.save').click();     // enter
      if (e.keyCode === 27){ 
        ExitfullScreen();
      }   // esc
    });

    function ExitfullScreen(){
      console.log('jancokk kon');
      $('#second-sidebar').show('fast')
      $('#header1').show('fast')
      $('#header2').show('fast')
      $('#header3').show('fast')
      $('#sidebar').show('fast')
      $('#content').addClass('row');
    }
  }


  berita  = `MADMONITORING APPROVAL DOCUMENT DashboardDokumen Temuan Tindak Lanjut Approval Document Master KPA Master PPK Master Cabang Berita Master Satker Master User Login Profile Register Log Out Item ItemActiveParentParentDashboardHomeZoom In Zoom Out HomeDokumen Temuan BPKCreate5AdonSuper AdminKEMBALI Inisialisasi DokumenIsi Dokumen TemuanSelesaiSIMPAN TEMUAN BATALMATRIK PERKEMBANGAN PELAKSANAAN TINDAK LANJUT TERHADAP LAPORAN HASIL AUDIT INSPEKTORAT JENDERAL KEMENTERIAN LINGKUNGAN HIDUP DAN KEHUTANANKeadaan s.d. Bulan:Desember 2020Nama Kegiatan:Audit Pelaksanaan Tusi Tahun 2015Nama Instansi:Ditjen Penegakan Lingkungan Hidup dan Kehutanan (PHLHK)Unit Kerja Eselon I:Ditjen PHLHKNo. & Tanggal LHA:LHA. 26/Itjen-Ins.3/Rhs/2016 tanggal 31NoUraian TemuanKodeRekomendasiKodeRingkasan Tindak LanjutStatus Tindak LanjutTindak lanjutAksiBerita Kepada KawanUji Nilai Maret 2017 (Surat No. S.141/set/KU/Set. 1/2/20017 tanggal 9 Februari 2017)Belum ada perkembangan tidak lanjutTuntas apabila dilampirkan laporan pelaksanaan kegiatan verifikasi pengaduan limbah di jalan raya Bojonegoro Kab. Serang (Dendy Listyawan dan Indrawan Mifta P.) yang telah dilengkapi berita acara verifikasi.Uji Nilai Juni 2017 (Surat No. S.424/Set/KU/Set. 1/5/2017 tanggal 8 Mei 2017)Belum ada perkembangan tindak lajut.Uji Nilai Juli 2017.Direktur Pengaduan, Pengawasan dan sanksi Administrasi Ditjen PHLHK telah memberikan teguran pembinaan kepada :Sdr. Dendy Listyawan, S.Sos selaku Pelaksana Verifikasi Pengaduan Limbah di Jl. Reya Bojonegara Kab. Serang, sesuai surat No. S. 505/PPSA/PP/GKM.0/5/2017 tanggal 5 Mei 2017 (copy terlampir)Sdr. Indrawan Mifta Prasetyanda, S.Si selaku Pelaksana Verifikasi Pengaduan Limbah di Jl. Raya Bojonegara Kab. Serang sesuai surat No. S.506/PPSA/PP/GKM.0/5/2017 tanggal 5 Mei 2017 (copy surat terlampir).Tuntas apabila dilampirkan berita acara verifikasi pada Laporan Kegiatan Verifikasi Pengaduan Limbah di Jl. Raya Bojonegara Kab. Serang.1Kegiatan Verifikasi Pengaduan Tahun 2015 Tidak tertib3.03.07Memerintahkan Tim Verifikasi Pengaduan Limbah di Jalan Raya Bojonegoro Kab. Serang (Dendy Listyawan dan Indrawan Mifta P.) untuk melengkapi laporan pelaksanaan kegiatan dengan berita acara verifikasi.06Uji Nilai Maret 2017 (Surat No. S.141/set/KU/Set. 1/2/20017 tanggal 9 Februari 2017)Belum ada perkembangan tidak lanjutTuntas apabila dilampirkan laporan pelaksanaan kegiatan verifikasi pengaduan limbah di jalan raya Bojonegoro Kab. Serang (Dendy Listyawan dan Indrawan Mifta P.) yang telah dilengkapi berita acara verifikasi.Uji Nilai Juni 2017 (Surat No. S.424/Set/KU/Set. 1/5/2017 tanggal 8 Mei 2017)Belum ada perkembangan tindak lajut.Uji Nilai Juli 2017.Direktur Pengaduan, Pengawasan dan sanksi Administrasi Ditjen PHLHK telah memberikan teguran pembinaan kepada :Sdr. Dendy Listyawan, S.Sos selaku Pelaksana Verifikasi Pengaduan Limbah di Jl. Reya Bojonegara Kab. Serang, sesuai surat No. S. 505/PPSA/PP/GKM.0/5/2017 tanggal 5 Mei 2017 (copy terlampir)Sdr. Indrawan Mifta Prasetyanda, S.Si selaku Pelaksana Verifikasi Pengaduan Limbah di Jl. Raya Bojonegara Kab. Serang sesuai surat No. S.506/PPSA/PP/GKM.0/5/2017 tanggal 5 Mei 2017 (copy surat terlampir).Tuntas apabila dilampirkan berita acara verifikasi pada Laporan Kegiatan Verifikasi Pengaduan Limbah di Jl. Raya Bojonegara Kab. Serang.OpenSurat perjanjian kerja Jasa Konsultasi Pengadaan Barang Perlengkapan Ruang Kerja Pegawai Ditjen PHLHK (terlampir)SK pemilihan jasa konsultan pengawas pada tahun 2017 (terlampir),Jakarta, September 2017Kepala Bagian Keuangan dan UmumS u w a r t i, S HNIP 19671014 199303 2 001Tindak LanjutHeading 2Berita Kepada KawanUji Nilai Maret 2017 (Surat No. S.141/set/KU/Set. 1/2/20017 tanggal 9 Februari 2017)Belum ada perkembangan tidak lanjutTuntas apabila dilampirkan laporan pelaksanaan kegiatan verifikasi pengaduan limbah di jalan raya Bojonegoro Kab. Serang (Dendy Listyawan dan Indrawan Mifta P.) yang telah dilengkapi berita acara verifikasi.Uji Nilai Juni 2017 (Surat No. S.424/Set/KU/Set. 1/5/2017 tanggal 8 Mei 2017)Belum ada perkembangan tindak lajut.Uji Nilai Juli 2017.Direktur Pengaduan, Pengawasan dan sanksi Administrasi Ditjen PHLHK telah memberikan teguran pembinaan kepada :Sdr. Dendy Listyawan, S.Sos selaku Pelaksana Verifikasi Pengaduan Limbah di Jl. Reya Bojonegara Kab. Serang, sesuai surat No. S. 505/PPSA/PP/GKM.0/5/2017 tanggal 5 Mei 2017 (copy terlampir)Sdr. Indrawan Mifta Prasetyanda, S.Si selaku Pelaksana Verifikasi Pengaduan Limbah di Jl. Raya Bojonegara Kab. Serang sesuai surat No. S.506/PPSA/PP/GKM.0/5/2017 tanggal 5 Mei 2017 (copy surat terlampir).Tuntas apabila dilampirkan berita acara verifikasi pada Laporan Kegiatan Verifikasi Pengaduan Limbah di Jl. Raya Bojonegara Kab. Serang.BATAL SIMPAN<h2 style="text-align: center;"><strong>Berita Kepada Kawan</strong></h2><p style="text-align: justify;"><br></p><p style="text-align: justify;"><strong style="font-size: 12pt;">Uji Nilai Maret 2017 (Surat No. S.141/set/KU/Set. 1/2/20017 tanggal 9 Februari 2017)</strong></p><p style="text-align: justify;"><span style="font-size: 12pt;">Belum ada perkembangan tidak lanjut</span></p><p style="text-align: justify;"><br></p><p style="text-align: justify;"><em style="font-size: 12pt; color: rgb(0, 0, 0);">Tuntas apabila dilampirkan laporan pelaksanaan kegiatan verifikasi pengaduan limbah di jalan raya Bojonegoro Kab. Serang (Dendy Listyawan dan Indrawan Mifta P.) yang telah dilengkapi berita acara verifikasi.</em></p><p style="text-align: justify;"><br></p><p style="text-align: justify;"><strong style="font-size: 12pt;">Uji Nilai Juni 2017 (Surat No. S.424/Set/KU/Set. 1/5/2017 tanggal 8 Mei 2017)</strong></p><p style="text-align: justify;"><br></p><p style="text-align: justify;"><br></p><p style="text-align: justify;"><br></p><p style="text-align: justify;"><span style="font-size: 12pt;">Belum ada perkembangan tindak lajut.</span></p><p style="text-align: justify;"><br></p><p style="text-align: justify;"><strong style="font-size: 12pt;">Uji Nilai Juli 2017.</strong></p><p style="text-align: justify;"><br></p><p style="text-align: justify;"><span style="font-size: 12pt;">Direktur Pengaduan, Pengawasan dan sanksi Administrasi Ditjen PHLHK telah memberikan teguran pembinaan kepada :</span></p><p style="text-align: justify;"><br></p><ol><li style="text-align: justify;"><span style="font-size: 12px;">Sdr. Dendy Listyawan, S.Sos selaku Pelaksana Verifikasi Pengaduan Limbah di Jl. Reya Bojonegara Kab. Serang, sesuai surat No. S. 505/PPSA/PP/GKM.0/5/2017 tanggal 5 Mei 2017 (copy terlampir)</span></li><li style="text-align: justify;"><span style="font-size: 12px;">Sdr. Indrawan Mifta Prasetyanda, S.Si selaku Pelaksana Verifikasi Pengaduan Limbah di Jl. Raya Bojonegara Kab. Serang sesuai surat No. S.506/PPSA/PP/GKM.0/5/2017 tanggal 5 Mei 2017 (copy surat terlampir).</span></li></ol><p style="text-align: justify;"><br></p><p style="text-align: justify;"><em style="font-size: 12pt; color: rgb(0, 0, 0);">Tuntas apabila dilampirkan berita acara verifikasi pada Laporan Kegiatan Verifikasi Pengaduan Limbah di Jl. Raya Bojonegara Kab. Serang.</em></p><h2><br></h2>`

  toggleResetPassword(){
    this.isResetForm = this.isResetForm? false:true;
  }

  toggleLogout(){
    this.isLogoutForm = this.isLogoutForm? false:true;
  }

  toggleSecondSidebar = true;
  secondSidebarToggle(){
    console.log('secondSidebarToggle ===>',this.toggleSecondSidebar)
    if(this.toggleSecondSidebar == true){
      this.toggleSecondSidebar = false;
      $('#second-sidebar').hide('fast')
    }else{
      this.toggleSecondSidebar = true;
      $('#second-sidebar').show('fast')
    }
    
  }

  fullScreenToggle(){
    console.log('secondSidebarToggle ===>',toggleFullscreen)
      $('#second-sidebar').hide('fast')
      $('#header1').hide('fast')
      $('#header2').hide('fast')
      $('#header3').hide('fast')
      $('#sidebar').hide('fast')
      $('#content').removeClass('row');
      UIkit.notification({message: '<span uk-icon=\'icon: shrink\'></span> tekan <b>Esc</b> untuk keluar dari mode Fullscreen '  ,  status: 'primary',pos: 'top-right'})
  }



  modelReset = {oldPassword : '', newPassword:'', newPasswordConfirmation:''};
  isSuccessResetPass = false;
  doResetPass(data){
    console.log('doResetPass ===>',data);
    
    this.authService.gantiPassword(this.UserProfile.id,this.modelReset).subscribe(
      result => {
        console.log('checkPassword OldPassword success | checkPassword ===>',result);
        this.signOut();
        
      },
      error => {
        console.log('checkPassword OldPassword error   | checkPassword ===>',error);
      }
    )


  }

  isValidOldPassword = false
  onOldPassType(pass){
    console.log('onOldPassType ===>',pass);
    this.authService.checkPassword(this.UserProfile.id,{password:this.modelReset.oldPassword}).subscribe(
      result => {
        console.log('checkPassword OldPassword success | checkPassword ===>',result);
        this.isValidOldPassword = result;
        
      },
      error => {
        console.log('checkPassword OldPassword error   | checkPassword ===>',error);
      }
    )
  }


  UIkit:any
  onSubmit() {
    this.authService.signin(this.loginForm.value).subscribe(
      result => {
        console.log('balikan login ===>',result); 
        this.responseHandler(result);
        var jsonUserProfileString = JSON.stringify(result.user);
        var user = localStorage.setItem("UserProfile", jsonUserProfileString);
        this.UserProfile = JSON.parse(localStorage.getItem("UserProfile"));
        this.isResetForm = false;
        this.isLogoutForm = false;
        // UIkit.notification({message: '<span uk-icon=\'icon: check\'></span> Selamat Datang '  + this.UserProfile.nama ,  status: 'success',pos: 'top-right'})



      },
      error => {
        this.errors = error.error;
      },() => {
        this.authState.setAuthState(true);
        this.loginForm.reset()
        this.router.navigate(['dashboard']);
        $('#headerName #header-dashboard').append('<h1 class="uk-heading-small" id="header-dashboard" >Dashboard</h1>')
      }
    );
  }

  // Handle response
  responseHandler(data){
    console.log('responseHandler ===>',data)
    this.token.handleData(data.access_token);
  }


  sidebarCollapse(){
    console.log('sidebar collapse function ===>')
    $('#sidebar').toggleClass('active');
  }


  currFFZoom = 1;
  currIEZoom = 100;
  zoomIn(){
    var step = 0.02;
    this.currFFZoom += step;
    $('body').css('MozTransform','scale(' + this.currFFZoom + ')');
    var stepie = 2;
    this.currIEZoom += stepie;
    $('body').css('zoom', ' ' + this.currIEZoom + '%');
  }

  zoomOut(){
    var step = 0.02;
    this.currFFZoom -= step;
    $('body').css('MozTransform','scale(' + this.currFFZoom + ')');
    var stepie = 2;
    this.currIEZoom -= stepie;
    $('body').css('zoom', ' ' + this.currIEZoom + '%');
  }

  // Signout
  signOut() {
    console.log('sign Out ===>',this.isSignedIn);
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['login']);
    this.isSuccessResetPass = false;
  }


  sideMenuClick(selectedMenu){
    console.log('sideMenuClick ===>',selectedMenu)
    this.router.navigate(selectedMenu.target.id);
  }


}
