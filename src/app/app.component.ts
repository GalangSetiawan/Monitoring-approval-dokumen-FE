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
      // if(toggleFullscreen == true){
      //   toggleFullscreen = false;
        $('#second-sidebar').show('fast')
        $('#header1').show('fast')
        $('#header2').show('fast')
        $('#header3').show('fast')
        $('#sidebar').show('fast')
        $('#content').addClass('row');

      // }
      // else{
      //   toggleFullscreen = true;
      //   $('#second-sidebar').show('fast')
      //   $('#header1').show('fast')
      //   $('#header2').show('fast')
      //   $('#header3').show('fast')
      // }
    }
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
    // if(toggleFullscreen == true){
    //   toggleFullscreen = false;
      $('#second-sidebar').hide('fast')
      $('#header1').hide('fast')
      $('#header2').hide('fast')
      $('#header3').hide('fast')
      $('#sidebar').hide('fast')
      $('#content').removeClass('row');

    // }
    // else{
    //   toggleFullscreen = true;
    //   $('#second-sidebar').show('fast')
    //   $('#header1').show('fast')
    //   $('#header2').show('fast')
    //   $('#header3').show('fast')
    // }
    
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
        var jsonUserProfileString = JSON.stringify(result.user);
        this.responseHandler(result);
        var user = localStorage.setItem("UserProfile", jsonUserProfileString);
        this.UserProfile = JSON.parse(localStorage.getItem("UserProfile"));
        this.isResetForm = false;
        this.isLogoutForm = false;
        UIkit.notification({message: '<span uk-icon=\'icon: check\'></span> Selamat Datang '  + this.UserProfile.nama ,  status: 'success',pos: 'top-right'})



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
