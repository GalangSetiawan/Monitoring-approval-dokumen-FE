import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './shared/token.service';
import { AuthStateService } from './shared/auth-state.service';
import { AuthService } from './shared/auth.service';
import { FormBuilder, FormGroup } from "@angular/forms";


import * as $ from 'jquery'


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
  UserProfile: User;
  loginForm: FormGroup;
  errors = null;

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
    this.auth.userAuthState.subscribe(val => {
        this.isSignedIn = val;
    });

    console.log('this.auth.userAuthState ===>',this.auth)

    if(this.UserProfile == undefined){

    }

    console.log('this.isSignedIn ===>',this.isSignedIn);
    console.log('this.loginForm.value ==>',this.loginForm.value);

  }

  onSubmit() {
    this.authService.signin(this.loginForm.value).subscribe(
      result => {
        console.log('balikan login ===>',result);
        this.UserProfile = result.user[0];
        this.responseHandler(result);
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
  }


  sideMenuClick(selectedMenu){
    console.log('sideMenuClick ===>',selectedMenu)
    this.router.navigate(selectedMenu.target.id);
  }


}
