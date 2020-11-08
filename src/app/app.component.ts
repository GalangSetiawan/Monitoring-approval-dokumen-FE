import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './shared/token.service';
import { AuthStateService } from './shared/auth-state.service';
import { AuthService } from './shared/auth.service';
import { FormBuilder, FormGroup } from "@angular/forms";
declare var UIkit: any;
import { NewsService } from './shared/news.service';
import { SharecomponentService } from './shared/sharecomponent.service';

import { DokumenserviceService } from './shared/dokumenservice.service';

import * as _ from "lodash";
import notify from 'devextreme/ui/notify';
import * as $ from 'jquery'
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { find } from 'rxjs/operators';

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
    public shareComponentService : SharecomponentService,
    private auth: AuthStateService,
    public dokumenService : DokumenserviceService,
    public router: Router,
    public fb: FormBuilder,
    public token: TokenService,
    public authService: AuthService ,
    private authState: AuthStateService,
    public newsService: NewsService,


  ) {
    this.loginForm = this.fb.group({
      username: [],
      password: []
    })
  }





  ngOnInit() {    
    $('#breadCrumbTitle a').text('Dashboard');
    this.selectActiveMenu('dashboard');

    this.auth.userAuthState.subscribe(val => {
        this.isSignedIn = val;
    });

    console.log('this.auth.userAuthState ===>',this.auth)

    if(this.isSignedIn == true){
      this.UserProfile = JSON.parse(localStorage.getItem("UserProfile"));
      console.log('this.UserProfile ===>',this.UserProfile);
      this.router.navigate(['dashboard'], {skipLocationChange: true});
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

    this.getDataBerita();
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



  listImg = [];
  getImgForNews(imgName,idx){
    this.newsService.downloadImage(imgName).subscribe(
      img => {
        // console.log('downloadImg success | downloadImage ===>',img);
        this.ListBerita[idx].latarBelakang = img
      },
      error => {
        this.ListBerita[idx].latarBelakang = undefined
        console.log('downloadImg error   | downloadImage ===>',error);
      }
    )
  }

  ListBerita = [];
  getDataBerita(){
    this.newsService.getActiveNews().subscribe(
      data => {
        console.log('getDataBerita success | getNews ===>',data);
        this.ListBerita = data.result;    
        for(var i in this.ListBerita){
          this.getImgForNews(this.ListBerita[i].bgImage,i);
        }
        console.log('getDataBerita | ListBerita ===>',this.ListBerita);
        console.log('getDataBerita | listImg ===>',this.listImg);
      },
      error => {
        console.log('getDataBerita error   | getNews ===>',error);
        notify({ message: "Whoops! failed to Get data",position: {my: "center top",at: "center top"}}, "error", 3000)
      }
    )
  }

  selectMenu(){
    $('#spinner').show();
  }



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
        Swal.fire(
          'Reset Berhasil', 
          'Password Berhasil direset, harap login kembali', 
          'success'
        )   
        this.signOut();
        
        
      },
      error => {
        console.log('checkPassword OldPassword error   | checkPassword ===>',error);
        Swal.fire(
          'Whoops Failed', 
          'Tidak berhasil me-reset password', 
          'error'
        )      
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

  imageUrl = undefined;
  downloadImg(imgName){
    this.newsService.downloadImage(imgName).subscribe(
      data => {
        console.log('downloadImg success | downloadImage ===>',data);
        this.imageUrl = data
      },
      error => {
        this.imageUrl = undefined
        console.log('downloadImg error   | downloadImage ===>',error);
        // notify({ message: "Whoops! failed to Get data",position: {my: "center top",at: "center top"}}, "error", 3000)
        Swal.fire(
          'Whoops Failed', 
          'Tidak berhasil mengambil gambar berita', 
          'error'
        )      
      }
    )
    
  }

  UIkit:any;
  onSubmit() {
    this.authService.signin(this.loginForm.value).subscribe(
      result => {
        console.log('balikan login ===>',result); 
        this.shareComponentService.sendDataCetakan(result.user);
        this.responseHandler(result);
        var jsonUserProfileString = JSON.stringify(result.user);
        var user = localStorage.setItem("UserProfile", jsonUserProfileString);
        this.UserProfile = JSON.parse(localStorage.getItem("UserProfile"));



        // this.UserProfile = result.user
        this.isResetForm = false
        this.isLogoutForm = false;
        this.errors = null;

        this.downloadImg(result.user.foto);
        // UIkit.notification({message: '<span uk-icon=\'icon: check\'></span> Selamat Datang '  + this.UserProfile.nama ,  status: 'success',pos: 'top-right'})
      },
      error => {
        this.errors = error.error;
      },() => {
        this.authState.setAuthState(true);
        this.loginForm.reset()
        this.router.navigate(['dashboard'], {skipLocationChange: true});
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
    this.router.navigate(['']);
    this.isSuccessResetPass = false;
    this.getDataBerita();

  }


  sideMenuClick(selectedMenu){
    console.log('sideMenuClick ===>',selectedMenu)
    this.router.navigate(selectedMenu.target.id, {skipLocationChange: true});
  }


  prevNews(event){
    console.log('prevNews | event ===>',event); 
    console.log('prevNews | listUIberita ==>', $('#listUIberita .uk-active').attr('id'))
    var findID = parseInt($('#listUIberita .uk-active').attr('id'));
    var findIndex = _.findIndex(this.ListBerita,{'title':findID});
    console.log('prevNews | findIndex ==>', findIndex, this.ListBerita[findIndex])
  }

  nextNews(event){
    console.log('nextNews | event ===>',event);
    console.log('nextNews | listUIberita ==>', $('#listUIberita .uk-active').attr('id'))
    var findID = parseInt($('#listUIberita .uk-active').attr('id'));
    var findIndex = _.findIndex(this.ListBerita,{'title':findID});
    console.log('nextNews | findIndex ==>', findIndex, this.ListBerita[findIndex])

  }

}
