import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { FormBuilder, FormGroup,Validators, ValidatorFn,ValidationErrors } from "@angular/forms";
import { MastersatkerService } from './../../shared/mastersatker.service';
import { MasterppkService } from './../../shared/masterppk.service';


import { MustMatch } from '../../_helper/must-match.validator';
import * as _ from "lodash";
import notify from 'devextreme/ui/notify';
import * as $ from 'jquery'
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  public titleHeader = "Master User";

  registerForm: FormGroup;
  submitted = false;
  errors = null;
  modelRegister = {email:'', oldPassword:'',satkerId:null, roleId:40,ppkId:null, username:null};


  public imagePath;
  imgURL: any;
  public message: string;

  


  constructor(
    public router: Router,
    public fb: FormBuilder,
    public masterSatkerService: MastersatkerService,
    public masterPpkService   : MasterppkService,

    public authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      id                   : [null],
      foto                 : [''],
      nama                 : ['', Validators.required],
      NIP                  : ['', Validators.required],
      satkerId             : ['', Validators.required],
      ppkId                : ['', Validators.required],
      password_confirmation: ['', Validators.required],
      username             : ['',[Validators.required, Validators.minLength(6)]],
      oldPassword          : [''],         
      roleId               : ['', Validators.required],
      email                : ['', [Validators.required, Validators.email]],
      password             : ['', [Validators.required, Validators.minLength(6)]],
    },{
      validatorPassword: MustMatch('password', 'password_confirmation'),
      validatorEmail: this.comparisonValidator()

    });
  }

  ngOnInit(): void {
    this.getDataUser();
    this.getDataSatker();
    $('#breadCrumbTitle a').text(this.titleHeader);
    this.selectActiveMenu('register')
  }

  

  selectActiveMenu(opened){
    this.removeActiveMenu();
    $('#listMenu ul .listMenu').removeClass('uk-active');
    if(opened == 'dashboard'){
      $('#listMenu #dashboard').addClass('uk-active');
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

  public comparisonValidator() : ValidatorFn{
    return (group: FormGroup): ValidationErrors => {
      const control1 = group.controls['myControl1'];
      const control2 = group.controls['myControl2'];
      if (control1.value !== control2.value) {
          control2.setErrors({notEquivalent: true});
      } else {
          control2.setErrors(null);
      }
      return;
    };
  }

    
  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }
  


  ListUser = [];
  getDataUser(){
    this.authService.getAllUser().subscribe(
      (result:any) => {
        console.log('Get data KPA success | getKPA ===>',result);
        this.ListUser = result.result;
        console.log('ListUser ===>',this.ListUser);
      },
      error => {
        console.log('Get data KPA error   | getKPA ===>',error);
        notify({ message: "Whoops! failed to Get data",position: {my: "center top",at: "center top"}}, "error", 3000)
      }
    )
  }


  windowMode = "grid"; // create|grid|edit|view
  windowModeView(mode){
    this.windowMode = mode;
    if(this.windowMode == 'create'){
      this.registerForm.reset();
      this.registerForm.enable();
      $('.uk-breadcrumb').append('<li class="uk-disabled" id="create"><a>Buat</a></li>')
      $('.uk-breadcrumb #edit').remove();
      $('.uk-breadcrumb #view').remove();
      this.modelRegister = {email:'', oldPassword:'',satkerId:null, roleId:40,ppkId:null, username:''};

    }else if (this.windowMode == 'edit'){
      $('.uk-breadcrumb').append('<li class="uk-disabled" id="edit"><a>Edit</a></li>')
      $('.uk-breadcrumb #create').remove();
      $('.uk-breadcrumb #view').remove();
      this.registerForm.enable();
      this.submitted = false;

      this.registerForm.controls['username'].disable();
      this.registerForm.controls['email'].disable();


    }else if (this.windowMode == 'view'){
      $('.uk-breadcrumb').append('<li class="uk-disabled" id="view"><a>Lihat</a></li>')
      $('.uk-breadcrumb #create').remove();
      $('.uk-breadcrumb #edit').remove();
      this.registerForm.disable();
      this.submitted = false;

    }else if(this.windowMode == 'grid'){
      this.submitted = false;
      $('.uk-breadcrumb #edit').remove();
      $('.uk-breadcrumb #create').remove();
      $('.uk-breadcrumb #view').remove();
    }
  }



  get f() { return this.registerForm.controls; }
  

  onOlPasswordChange(pass){
    console.log('onOlPasswordChange ====>',pass);


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
        notify({ message: "Whoops! failed to Get data",position: {my: "center top",at: "center top"}}, "error", 3000)
      }
    )
  }

  ListPpk = [];
  onSatkerChange(id){
    this.modelRegister.ppkId = null;
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

 


  cleanBlankKey(obj){
    for (var propName in obj) { 
      if (obj[propName] == null || obj[propName] == undefined || obj[propName] == "" ) {
        delete obj[propName];
      }
    }
    return obj;
  }


  filterData = {username:null, nama:null,email:null}
  doSearch(filter){
    this.filterData = filter; 
    console.log('doSearch ===>',this.filterData);

    this.filterData = this.cleanBlankKey(this.filterData);

    this.authService.searchUser(this.filterData).subscribe(
      result => {
        console.log('searchPPK PPK success | searchPPK ===>',result);
        this.ListUser = result.result;
        
      },
      error => {
        console.log('searchPPK PPK error   | searchPPK ===>',error);
      }
    )
  }

  doReset(){
    console.log('this.filterData ===>',this.filterData)
    this.filterData = {username:null, nama:null,email:null}
  }


  isValidOldPassword = true
  onOldPassType(pass){
    console.log('onOldPassType ===>',pass);
    this.authService.checkPassword(this.registerForm.value.id,{password:this.modelRegister.oldPassword}).subscribe(
      result => {
        console.log('checkPassword OldPassword success | checkPassword ===>',result);
        this.isValidOldPassword = result;
        
      },
      error => {
        console.log('checkPassword OldPassword error   | checkPassword ===>',error);
      }
    )
  }

  isValidEmail = true;
  onEmailType(email){
    console.log('onEmailType ===>',email);
    console.log('modelRegister =>',this.modelRegister);

    this.authService.checkEmail({email:this.modelRegister.email}).subscribe(
      result => {
        console.log('checkEmail register success | checkEmail ===>',result);
        this.isValidEmail = result;
        
      },
      error => {
        console.log('checkEmail register error   | checkEmail ===>',error);
      }
    )
  }

  isValidUsername = true;
  onUsernameType(username){
    console.log('onUsernameType ===>',username);
    console.log('modelRegister =>',this.modelRegister);

    this.authService.checkUsername({username:this.modelRegister.username}).subscribe(
      result => {
        console.log('checkUsername register success | checkUsername ===>',result);
        this.isValidUsername = result;
        
      },
      error => {
        console.log('checkUsername register error   | checkUsername ===>',error);
      }
    )

  }

  onEditClick(row){
    console.log('btnEdit ===>',row.data);
    this.submitted = false;
    this.windowModeView('edit');
    this.registerForm.patchValue({
      id                   : row.data.id,
      created_at           : row.data.created_at,
      updated_at           : row.data.updated_at,
      nama                 : row.data.nama,
      username             : row.data.username,
      roleId               : row.data.roleId,
      roleName             : row.data.roleName,
      email                : row.data.email,
      satkerId             : row.data.satkerId,
      jabatan              : row.data.jabatan,
      ppkId                : row.data.ppkId,
      // foto                 : row.data.foto,
    });
    console.log('this.registerForm Clik Edit ===>',this.registerForm.value);

    this.onSatkerChange(row.data.satkerId)
  }

  onViewClick(row){
    console.log('btnEdit ===>',row.data);
    this.windowModeView('view');
    this.registerForm.patchValue({
      id                   : row.data.id,
      created_at           : row.data.created_at,
      updated_at           : row.data.updated_at,
      nama                 : row.data.nama,
      username             : row.data.username,
      roleId               : row.data.roleId,
      roleName             : row.data.roleName,
      email                : row.data.email,
      satkerId             : row.data.satkerId,
      jabatan              : row.data.jabatan,
      foto                 : row.data.foto,
      ppkId                : row.data.ppkId,
    });
    console.log('this.registerForm Clik Edit ===>',this.registerForm.value);
  }


  deleteDataUser = "";
  selectedForDelete = {};
  modalDelete(row){
    console.log('modalDelete ===>',row.data);
    this.deleteDataUser = row.data.nama;
    this.selectedForDelete = row.data;
  }

  doDelete(){
    console.log('selected for delete ===>',this.selectedForDelete);

    this.authService.deleteUser(this.selectedForDelete).subscribe(
      result => {
        console.log('Delete success | deleteUser ===>',result)
        notify({ message: "Yosssh! Success to Delete data",position: { my: "center top",at: "center top"}}, "success", 3000);
        this.ListUser = _.remove(this.ListUser, function(data){
          return data.id != result.result.id;
        })
        $('#btnHapus').click();
      },
      error => {
        console.log('Delete error   | deleteUser ===>',error);
        notify({ message: "Whoops! failed to Delete data",position: {my: "center top",at: "center top"}}, "error", 3000)
      }
    )

  }


  selectRole(roleId){
    switch(roleId){
      case 50:
        var roleName = "Super Admin"
        break;
      case 40:
        var roleName = "Satker"
        break;
    }
    return roleName;
  }

  


  onSubmit() {
    this.submitted = true;
    console.log('onsubmit awal ====>',this.registerForm.value)

  
    if (this.registerForm.invalid) {
      console.log('invalid input ===>',this.registerForm.value);
      return;
    }else{
      this.registerForm.value.roleName = this.selectRole(this.registerForm.value.roleId);
      if(this.registerForm.value.id == null){ //do save
        console.log('do save ===>',this.registerForm.value)
        this.authService.register(this.registerForm.value).subscribe(
          data => {

            console.log('onSubmit create data | success ===>',data.result);
            this.ListUser.push(data.result);
            notify({ message: "Yayyy! Berhasil menambahkan data",position: { my: "center top",at: "center top"}}, "success", 3000);

            this.windowModeView('grid');
            
          },
          error => {
            this.errors = error.error;

            notify({ message: "Whoops! Gagal menambahkan data",position: {my: "center top",at: "center top"}}, "error", 3000)

          }
            
        )
        
      }else{//do update
        console.log('do update ===>',this.registerForm.value)

        this.authService.updateUser(this.registerForm.value).subscribe(
          data => {

            console.log('onSubmit Update data | success ===>',data.result);
            this.ListUser.push(data.result);
            notify({ message: "Yayyy! Berhasil memperbaharui data",position: { my: "center top",at: "center top"}}, "success", 3000);

            this.windowModeView('grid');
            
          },
          error => {
            this.errors = error.error;

            notify({ message: "Whoops! Gagal menambahkan data",position: {my: "center top",at: "center top"}}, "error", 3000)

          }
            
        )

      }

      
    }
    
  }

  

}
